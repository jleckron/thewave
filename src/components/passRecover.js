/**

  passRecover.js handles the input of recovery email and sends the recovery email

*/
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

import Styles from '../styles/styles'

import "firebase/auth"
import { db } from '../config'


export default class PassRecover extends Component{
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      errorMessage: "",
      isFocusedEmail: false,
      emailErrorFlag: false,
      indicator: false,
    };
  }

  //function called on button pressed that performs Firebase password reset function on given email
  recoverButtonPressed = () => {
    const { email } = this.state
    if (email===""){
        this.setState({emailErrorFlag: true, errorMessage: "Please provide an email"})
        return;
    }
    this.setState({indicator: true})
    db.auth()
      .sendPasswordResetEmail(email)
        .then(() => {
            //email sent
            this.setState({indicator: false})
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Landing' }],
            });
        })
        .catch(error=>{
          this.setState({errorMessage: error.message, indicator: false})
        })

  }

  //toggles the state of isFocused variables for text entry box highlights
  onFocusEmail = () => {
    this.setState({
      emailErrorFlag: false,
      isFocusedEmail: !this.state.isFocusedEmail
    })
  }


  render (){
    return (
      <View style = {Styles.container}>
        <Spinner
          visible={this.state.indicator}
        />
        <Text style = {Styles.signupText}>Where should we sent a password recovery email?{"\n"}</Text>
        <View style = {Styles.screenContainer}>
          <TextInput
            autoCapitalize = "none"
            placeholder = "Email"
            placeholderTextColor = "silver"
            onFocus = {this.onFocusEmail}
            onBlur = {this.onFocusEmail}
            style = {[Styles.buttonContainer, Styles.textEntry,
              (this.state.emailErrorFlag) ? Styles.textEntryError : (this.state.isFocusedEmail) ? Styles.textEntryFocused : Styles.textEntry,
              Styles.textEntryOverlay]}
            onChangeText = {text => this.setState({email: text})}
          />
        </View>
        <View style = {Styles.screenContainer}>
          <SolidButton
            onPress = {this.recoverButtonPressed}
            title = "Recover Password"
          />
        </View>
        <Text style={Styles.errorText}> {this.state.errorMessage} </Text>
      </View>
    );
  }
}

const SolidButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={[Styles.buttonContainer, Styles.solidButtonContainer]}>
    <Text style={[Styles.buttonText, Styles.solidButtonText]}>{title}</Text>
  </TouchableOpacity>
);

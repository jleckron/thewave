/**

  userSignup.js handles the user signup functionality

*/
import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'


import Styles from '../styles/styles'

import "firebase/auth"
import { db } from '../config'


export default class UserSignup extends Component{
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
      indicator: false,
      isFocusedEmail: false,
      isFocusedPass: false,
      isFocusedConfirmPass: false,
      emailErrorFlag: false,
      passwordErrorFlag: false,
      confirmPasswordErrorFlag: false,
    };
  }

  indexUser = () => {
    user = db.auth().currentUser
    db.database().ref('users').child(user.uid).set({
      email: user.email,
    })
  }

  //function called on submit pressed that performs Firebase singup functions
  submitButtonPressed = () => {
    const { email, password, confirmPassword } = this.state
    if (email==="" || password==="" || confirmPassword===""){
      if(email===""){
        this.setState({emailErrorFlag: true});
      }
      if (password==="") {
        this.setState({passwordErrorFlag: true});
      }
      if (confirmPassword==="") {
        this.setState({confirmPasswordErrorFlag: true});
      }
      this.setState({errorMessage: "Please fill all entry fields"})
      return;
    }
    if (!(password===confirmPassword)){
      this.setState({passwordErrorFlag: true, confirmPasswordErrorFlag: true});
      this.setState({errorMessage: "Passwords do not match"})
      return;
    }
    this.setState({indicator: true})
    db
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.indexUser()
        this.setState({indicator: false})
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'UserInfo' }],
        });
      })
      .catch(error => this.setState({errorMessage: error.message, indicator:false}))
  }

  //toggles the state of isFocused variables for text entry box highlights
  onFocusEmail = () => {
    this.setState({
      emailErrorFlag: false,
      isFocusedEmail: !this.state.isFocusedEmail
    })
  }

  onFocusPass = () => {
    this.setState({
      passwordErrorFlag: false,
      isFocusedPass: !this.state.isFocusedPass
    })
  }

  onFocusConfirmPass = () => {
    this.setState({
      confirmPasswordErrorFlag: false,
      isFocusedConfirmPass: !this.state.isFocusedConfirmPass
    })
  }

  render (){
    return (
      <View style = {Styles.container}>
        <Spinner
            visible={this.state.indicator}
          />
        <View style = {Styles.screenContainer}>
          <TextInput
            autoCapitalize = "none"
            placeholder = "Email"
            placeholderTextColor = "dimgrey"
            onFocus = {this.onFocusEmail}
            onBlur = {this.onFocusEmail}
            style = {[Styles.buttonContainer,
              (this.state.emailErrorFlag) ? Styles.textEntryError : (this.state.isFocusedEmail) ? Styles.textEntryFocused : Styles.textEntry,
              Styles.textEntryOverlay]}
            onChangeText = {text => this.setState({email: text})}
          />
        </View>
        <View style = {Styles.screenContainer}>
          <TextInput
            autoCapitalize = "none"
            secureTextEntry = {true}
            placeholder = "Password"
            placeholderTextColor = "dimgrey"
            onFocus = {this.onFocusPass}
            onBlur = {this.onFocusPass}
            style = {[Styles.buttonContainer,
              (this.state.passwordErrorFlag) ? Styles.textEntryError : (this.state.isFocusedPass) ? Styles.textEntryFocused : Styles.textEntry,
              Styles.textEntryOverlay]}
            onChangeText = {text => this.setState({password: text})}
          />
        </View>
        <View style = {Styles.screenContainer}>
          <TextInput
            autoCapitalize = "none"
            secureTextEntry = {true}
            placeholder = "Confirm Password"
            placeholderTextColor = "dimgrey"
            onFocus = {this.onFocusConfirmPass}
            onBlur = {this.onFocusConfirmPass}
            style = {[Styles.buttonContainer,
              (this.state.confirmPasswordErrorFlag) ? Styles.textEntryError : (this.state.isFocusedConfirmPass) ? Styles.textEntryFocused : Styles.textEntry,
              Styles.textEntryOverlay]}
            onChangeText = {text => this.setState({confirmPassword: text})}
          />
        </View>
        <SolidButton
          onPress = {this.submitButtonPressed}
          autoCapitalize = "none"
          title = "Submit"
        />
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
const ClearButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={[Styles.buttonContainer, Styles.clearButtonContainer]}>
    <Text style={[Styles.buttonText, Styles.clearButtonText]}>{title}</Text>
  </TouchableOpacity>
);

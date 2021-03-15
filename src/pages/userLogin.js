/**

  userLogin.js handles the user login functionality

  -----> Must still implement password recovery <-----

*/
import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

import Styles from '../styles/styles'

import "firebase/auth"
import { db } from '../config'


export default class UserLogin extends Component{
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      indicator: false,
      isFocusedEmail: false,
      isFocusedPass: false,
    };
  }

  //function called on login pressed that performs Firebase signin functions
  submitButtonPressed = () => {
    const { email, password } = this.state

    if (email==="" || password===""){
      this.setState({errorMessage: "Please fill all entry fields"})
      return;
    }

    this.setState({indicator : true})
    db.auth()
      .signInWithEmailAndPassword(email,password)
      .then(()=> {
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: 'UserInfo' }],
            });
            this.setState({indicator : false})
        })
      .catch(error=>{
            this.setState({errorMessage: error.message, indicator : false})
      })
  }

  //toggles the state of isFocused variables for text entry box highlights
  onFocusEmail = () => {
    this.setState({
      isFocusedEmail: !this.state.isFocusedEmail
    })
  }

  onFocusPass = () => {
    this.setState({
      isFocusedPass: !this.state.isFocusedPass
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
            style = {[Styles.buttonContainer, (this.state.isFocusedEmail) ? Styles.textEntryFocused : Styles.textEntry, Styles.textEntryOverlay]}
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
            style = {[Styles.buttonContainer, (this.state.isFocusedPass) ? Styles.textEntryFocused : Styles.textEntry, Styles.textEntryOverlay]}
            onChangeText = {text => this.setState({password: text})}
          />
        </View>
        <View style = {Styles.screenContainer}>
          <SolidButton
            onPress = {this.submitButtonPressed}
            title = "Login"
          />
        </View>
        <View style = {[Styles.textContainer, Styles.signupText]}>
          <Text>
            Forgot your password?
          </Text>
            <TouchableOpacity>
              <Text style = {{color: 'blue'}}> Reset Password </Text>
            </TouchableOpacity>
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

/**

  landingPage.js is the landing screen for the app if user is not logged in
  Allows user to login or signup

*/
import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import Styles from '../styles/styles'

export default class LandingPage extends Component{
  render() {
    return (
      <View style = {Styles.container}>
         <Text style = {Styles.homeText}>
           The Wave
         </Text>
         <View style = {Styles.screenContainer}>
           <SolidButton
             onPress = {() => this.props.navigation.navigate('UserLogin')}
             title = "Login"
           />
         </View>
         <Text style = {Styles.signupText}>
           Don't have an account?
         </Text>
         <View style = {Styles.screenContainer}>
           <ClearButton
             onPress = {() => this.props.navigation.navigate('UserSignup')}
             title = "Signup"
           />
         </View>
       </View>
     );
  };
}


const ClearButton = ({ onPress, title }) => (
 <TouchableOpacity onPress={onPress} style={[Styles.buttonContainer, Styles.clearButtonContainer]}>
   <Text style={[Styles.buttonText, Styles.clearButtonText]}>{title}</Text>
 </TouchableOpacity>
);
const SolidButton = ({ onPress, title }) => (
 <TouchableOpacity onPress={onPress} style={[Styles.buttonContainer, Styles.solidButtonContainer]}>
   <Text style={[Styles.buttonText, Styles.solidButtonText]}>{title}</Text>
 </TouchableOpacity>
);


import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import Styles from '../styles/styles';


export default class Home extends Component{

  render() {
    return (
      <View style = {Styles.container}>
         <Text style = {Styles.homeText}>
           What are you driving today?
         </Text>
      </View>
     );
  };
}

const SolidButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={[Styles.buttonContainer, Styles.solidButtonContainer]}>
    <Text style={[Styles.buttonText, Styles.solidButtonText]}>{title}</Text>
  </TouchableOpacity>
);

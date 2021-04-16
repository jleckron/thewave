import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import Styles from '../styles/styles'

export default class LinkMedia extends Component{
    render(){
        return(
            <View style = {Styles.container}>
                <Text style = {Styles.homeText}>
                Feature Coming Soon
                </Text>
                <View>
                <SolidButton
                    onPress = {() => this.props.navigation.goBack()}
                    title = "Done"
                />
                </View>
            </View>
        )
    };
}


const SolidButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={[Styles.buttonContainer, Styles.solidButtonContainer]}>
      <Text style={[Styles.buttonText, Styles.solidButtonText]}>{title}</Text>
    </TouchableOpacity>
  );
  
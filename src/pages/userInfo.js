/**

  userInfo.js is the landing page after a successful sign up for first time user
  Can also be accessed from profile settings

  Allows users to add or update data to profile:
      - Profile Picture
      - Display Name
      - Real Name
      - Add/Delete Vehicle(s)
      - Link other social medias


*/
import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import ImagePicker from 'react-native-image-picker'
import Spinner from 'react-native-loading-spinner-overlay'

import Styles from '../styles/styles'

import "firebase/auth"
import { db } from '../config'

export default class UserInfo extends Component{
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      year: "",
      make: "",
      model: "",
      submodel: "",
      color: "",
      description: "",
      errorMessage: "",
      ifFocusedName: false,
      ifFocusedMake: false,
      addVehicleFlag: false,
      addMediaFlag: false,
      indicator: false,
      vehicleList: [],
    };
  }

  onFocusName = () => {
    this.setState({
      isFocusedName: !this.state.isFocusedName
    });
  }

  setVehicleFlag = () => {
    this.setState({
      addVehicleFlag: !this.state.addVehicleFlag
    });
  }

  setMediaFlag = () => {
    this.setState({
      addMediaFlag: !this.state.addMediaFlag
    });
  }

  initVehicleList = () => {
    var ref = db.database.ref('users').child(db.auth().currentUser.uid).child('registeredVehicles')

  }

  addVehicleComponent = () => {
    const {year, make, model, submodel, color, description} = this.state
    if (year==="" || make==="" || model==="" || color===""){
      this.setState({errorMessage: "Must provide year, make, model and color"})
      return;
    }
    this.setState({indicator : true})
    uid = db.auth().currentUser.uid
    var newVehicleRef = db.database().ref('vehicles').push()
    newVehicleRef.set( {
      ownerID: uid,
      year: year,
      make: make,
      model: model,
      submodel: submodel,
      color: color,
      description: description,
    })
      .then(() => {
        var regVehicleRef = db.database().ref('users').child(uid).child('registeredVehicles').push()
        regVehicleRef.set({
          vehicleID: newVehicleRef.key,
        })
          .then(() => {
            this.setState({indicator : false})
            this.setVehicleFlag()
          })
          .catch(error => this.setState({errorMessage: error.message, indicator:false}))
      })
      .catch(error => this.setState({errorMessage: error.message, indicator:false}))
  }

  clearState = () => {
    this.setState({
      name: "",
      year: "",
      make: "",
      model: "",
      submodel: "",
      color: "",
      description: "",
      errorMessage: "",
    });
    this.setVehicleFlag();
  }

  signoutButtonPressed = () => {
    db.auth().signOut()
      .then(() => {
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'Landing' }],
        });
      })
      .catch(error => this.setState({errorMessage: error.message}))
  }

  render() {
    const addVehicleFalse =
    <View style = {Styles.container}>
      <Text style = {Styles.homeText}>
        What do you drive?
      </Text>
      <View style = {Styles.screenContainer}>
        <TextInput
          autoCapitalize = "none"
          placeholder = "Name (All users can see)"
          placeholderTextColor = "dimgrey"
          onFocus = {this.onFocusName}
          onBlur = {this.onFocusName}
          style = {[Styles.buttonContainer, (this.state.isFocusedName) ? Styles.textEntryFocused : Styles.textEntry, Styles.textEntryOverlay]}
          onChangeText = {text => this.setState({name: text})}
        />
       </View>
       <View style = {Styles.screenContainer}>
        <CustomAddButton
          onPress = {this.setVehicleFlag}
          title = "Add a Vehicle"
        />
      </View>
      <View style = {Styles.screenContainer}>
        <SolidButton
          onPress = {this.setMediaFlag}
          title = "Link Social Medias"
        />
      </View>
      <View style = {Styles.screenContainer}>
      <Text> {"\n"} </Text>
        <SignOutButton
          onPress = {this.signoutButtonPressed}
          title = "Sign Out"
        />
      </View>
      <View>
        <Text style={Styles.errorText}> {this.state.errorMessage} </Text>
      </View>
    </View>;

    const addVehicleTrue =
    <View style = {Styles.userInfoContainer}>
      <View style = {Styles.UserInfoEntryContainer}>
        <Text style = {Styles.homeText}>
          Add a Vehicle
        </Text>
        <View style = {Styles.screenContainer}>
          <TextInput
            placeholder = "Year (ex. 2020)"
            placeholderTextColor = "dimgrey"
            onFocus = {this.onFocusMake}
            onBlur = {this.onFocusMake}
            style = {[Styles.buttonContainer, (this.state.isFocusedMake) ? Styles.textEntryFocused : Styles.textEntry, Styles.textEntryOverlay]}
            onChangeText = {text => this.setState({year: text})}
          />
        </View>
        <View style = {Styles.screenContainer}>
          <TextInput
            placeholder = "Make (ex. Honda)"
            placeholderTextColor = "dimgrey"
            onFocus = {this.onFocusMake}
            onBlur = {this.onFocusMake}
            style = {[Styles.buttonContainer, (this.state.isFocusedMake) ? Styles.textEntryFocused : Styles.textEntry, Styles.textEntryOverlay]}
            onChangeText = {text => this.setState({make: text})}
          />
        </View>
        <View style = {Styles.screenContainer}>
          <TextInput
            placeholder = "Model (ex. Civic)"
            placeholderTextColor = "dimgrey"
            onFocus = {this.onFocusMake}
            onBlur = {this.onFocusMake}
            style = {[Styles.buttonContainer, (this.state.isFocusedMake) ? Styles.textEntryFocused : Styles.textEntry, Styles.textEntryOverlay]}
            onChangeText = {text => this.setState({model: text})}
          />
        </View>
        <View style = {Styles.screenContainer}>
          <TextInput
            placeholder = "Trim (ex. Si) (optional)"
            placeholderTextColor = "dimgrey"
            onFocus = {this.onFocusMake}
            onBlur = {this.onFocusMake}
            style = {[Styles.buttonContainer, (this.state.isFocusedMake) ? Styles.textEntryFocused : Styles.textEntry, Styles.textEntryOverlay]}
            onChangeText = {text => this.setState({submodel: text})}
          />
        </View>
        <View style = {Styles.screenContainer}>
          <TextInput
            placeholder = "Color (ex. Crystal Black Pearl)"
            placeholderTextColor = "dimgrey"
            onBlur = {this.onFocusMake}
            style = {[Styles.buttonContainer, (this.state.isFocusedMake) ? Styles.textEntryFocused : Styles.textEntry, Styles.textEntryOverlay]}
            onChangeText = {text => this.setState({color: text})}
          />
        </View>
        <View style = {Styles.screenContainer}>
          <TextInput
            placeholder = "Description (optional)"
            placeholderTextColor ="dimgrey"
            onFocus = {this.onFocusMake}
            onBlur = {this.onFocusMake}
            style = {[Styles.buttonContainer, (this.state.isFocusedMake) ? Styles.textEntryFocused : Styles.textEntry, Styles.textEntryOverlay]}
            onChangeText = {text => this.setState({description: text})}
            multiline = {true}
          />
        </View>
      </View>
      <View style = {Styles.rowSpaceBetweenContainer}>
        <InlineButton
          onPress = {this.clearState}
          title = "Cancel"
         />
        <InlineButton
          onPress = {this.addVehicleComponent}
          title = "Done"
         />
      </View>
      <View>
        <Text style={Styles.errorText}> {this.state.errorMessage} </Text>
      </View>
    </View>;

    const addMediaTrue =
    <View style = {Styles.container}>
      <Text style = {Styles.homeText}>
        Link Social Medias
      </Text>
      <View>
        <SolidButton
          onPress = {this.setMediaFlag}
          title = "Done"
         />
      </View>
    </View>;

    return (
      <View style = {Styles.container}>
        <Spinner
          visible={this.state.indicator}
        />
        <View>
          {(this.state.addVehicleFlag) ? addVehicleTrue : ((this.state.addMediaFlag) ? addMediaTrue : addVehicleFalse)}
        </View>
      </View>
     );
  };
}

const CustomAddButton = ({ onPress, title }) => (
 <TouchableOpacity onPress={onPress} style={[Styles.buttonContainer, Styles.solidButtonContainer]}>
  <View style = {Styles.inlineContainer}>
    <FontAwesomeIcon icon="plus-square" size ='26' color={Styles.container.backgroundColor}/>
    <Text style={[Styles.buttonText, Styles.solidButtonText]}>{title}</Text>
  </View>
 </TouchableOpacity>
);

const SolidButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={[Styles.buttonContainer, Styles.solidButtonContainer]}>
    <Text style={[Styles.buttonText, Styles.solidButtonText]}>{title}</Text>
  </TouchableOpacity>
);

const InlineButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={[Styles.buttonContainer, Styles.solidButtonContainer, Styles.inlineButtonContainer]}>
    <Text style={[Styles.buttonText, Styles.solidButtonText]}>{title}</Text>
  </TouchableOpacity>
);

const SignOutButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={[Styles.buttonContainer, Styles.solidButtonContainer, Styles.solidRedButton]}>
    <Text style={[Styles.buttonText, Styles.solidButtonText]}>{title}</Text>
  </TouchableOpacity>
);

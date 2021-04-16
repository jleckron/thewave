/**

  userInfo.js is the landing page after a successful sign up for first time user
  Can also be accessed from profile settings

  Allows users to add or update data to profile:
      - Profile Picture
      - Display Name
      - Real Name
      - Add/Delete Vehicle(s)
      - Link other social medias


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


*/
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Spinner from 'react-native-loading-spinner-overlay'


import { connect } from 'react-redux';
import { listUpdater } from '../actions/updater'

import Styles from '../styles/styles.js'

import "firebase/auth"
import { db } from '../config.js'

class UserInfo extends Component{
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
      vehicleEditID: "",
      vehicleEditIndex: "",
      ifFocusedName: false,
      ifFocusedMake: false,
      addVehicleFlag: false,
      editVehicleFlag: false,
      indicator: false,
      localVehicleList: this.props.vehicleList.vehicleList,
    };
  }

// ------ Change states of focused variables for text entry highlights ------
  onFocusName = () => {
    this.setState({isFocusedName: !this.state.isFocusedName});
  }

  setVehicleFlag = () => {
    this.setState({addVehicleFlag: !this.state.addVehicleFlag});
  }

  editVehicleFlag = (id) => {
    const index = this.findListIndex(id)
    this.setState({
      year: this.state.localVehicleList[index].value.year,
      make: this.state.localVehicleList[index].value.make,
      model: this.state.localVehicleList[index].value.model,
      submodel: this.state.localVehicleList[index].value.submodel,
      color: this.state.localVehicleList[index].value.color,
      description: this.state.localVehicleList[index].value.description,
      editVehicleFlag: !this.state.editVehicleFlag,
      vehicleEditID: id,
      vehicleEditIndex: index,
    })

  }
// ---------------------------------------------------------------------------


  // Clears state in case of cancel button pressed with non-empty text fields
  clearState = () => {
    this.setState({
      year: "",
      make: "",
      model: "",
      submodel: "",
      color: "",
      description: "",
      addVehicleFlag: false,
      editVehicleFlag: false,
      errorMessage: "",
    });
  }

  // Helper function to find index of a key in the vehicleList state
  findListIndex = (key) => {
    for(let i=0; i<this.state.localVehicleList.length; i++){
      if(this.state.localVehicleList[i].key==key){
        return i
      }
    }
  }

  // Helper function to decide to display empty or initialized text fields in case of add or edit respectively
  isAddorEdit = () => {
    if(this.state.addVehicleFlag || this.state.editVehicleFlag){
      return true
    }
    return false
  }

  // Helper function to send edited list to redux state
  sendNewListToRedux = () => {
    this.props.dispatch(listUpdater(this.state.localVehicleList))
  }

  //--- Handles updating vehicleList state and firebase database on Done button press
  addVehicleComponent = () => {
    const {year, make, model, submodel, color, description} = this.state
    if (year==="" || make==="" || model==="" || color===""){
      this.setState({errorMessage: "Must provide year, make, model and color"})
      return;
    }
    this.setState({indicator:  true})
    uid = db.auth().currentUser.uid
    var newVehicleRef = db.database().ref('vehicles').push()
    newVehicleRef.set( {
      ownerID: uid,
      year: year.trim().split(/ +/).join(" "),
      make: make.trim().split(/ +/).join(" "),
      model: model.trim().split(/ +/).join(" "),
      submodel: submodel.trim().split(/ +/).join(" "),
      color: color.trim().split(/ +/).join(" "),
      description: description.trim().split(/ +/).join(" "),
    })
      .then(() => {
        var regVehicleRef = db.database().ref('users').child(uid).child('registeredVehicles').push()
        regVehicleRef.set({
          vehicleID: newVehicleRef.key,
        })
          .then(() => {
            this.updateVehicleList(newVehicleRef.key, year, make, model, submodel, color, description)
            this.setState({indicator:  false})
            this.clearState()
          })
          .catch(error => this.setState({errorMessage: error.message, indicator: false}))
      })
      .catch(error => this.setState({errorMessage: error.message, indicator: false}))
  }

  // Handles editing vehicle information on done button pressed in firebase and local
  editVehicleComponent = () => {
    const {year, make, model, submodel, color, description} = this.state
    if (year==="" || make==="" || model==="" || color===""){
      this.setState({errorMessage: "Must provide year, make, model and color"})
      return;
    }
    this.setState({indicator:  true})
    let index = this.state.vehicleEditIndex
    this.updateVehicle(this.state.vehicleEditID, false)
    uid = db.auth().currentUser.uid
    this.state.localVehicleList[index] = ({
      key: this.state.vehicleEditID,
      value: {
        ownerID: uid,
        color: color.trim().split(/ +/).join(" "),
        make: make.trim().split(/ +/).join(" "),
        model: model.trim().split(/ +/).join(" "),
        submodel: submodel.trim().split(/ +/).join(" "),
        year: year.trim().split(/ +/).join(" "),
        description: description.trim().split(/ +/).join(" "),
      }
    })
    this.setState({indicator:  false})
    this.clearState()
  }


  updateVehicleList = (key, year, make, model, submodel, color, description) =>{
    this.state.localVehicleList.push({
      key: key,
      value: {
          color: color.trim().split(/ +/).join(" "),
          make: make.trim().split(/ +/).join(" "),
          model: model.trim().split(/ +/).join(" "),
          submodel: submodel.trim().split(/ +/).join(" "),
          year: year.trim().split(/ +/).join(" "),
          description: description.trim().split(/ +/).join(" "),
      }
    });
    this.sendNewListToRedux()
  }

/*--- Handles deleting / updating vehicle from vehicleList state and firebase
      database on trashcan press or edit submit.
      Delete if flag it true --- Edit if flag is false
*/
  updateVehicle = (id, flag) => {
    let index = -1
    var updates = {}
    if(flag==true){
      index = this.findListIndex(id)
      this.state.localVehicleList.splice(index, 1)
      this.setState({localVehicleList: this.state.localVehicleList})
      updates['/vehicles/' + id] = null
    }
    else{
      updates['/vehicles/' + id] = ({
        year: this.state.year,
        make: this.state.make,
        model: this.state.model,
        submodel: this.state.submodel,
        color: this.state.color,
        description: this.state.description,
      })
    }
    var uid = db.auth().currentUser.uid
    db.database().ref('users').child(uid).child('registeredVehicles')
    .once("value", function(snapshot) {
      snapshot.forEach(function(data) {
        if(data.val().vehicleID === id){
          if(flag==true){
            updates['/users/' + uid + '/registeredVehicles/' + data.key] = null
          }
        }
      })
    })
    .then(() => {
      this.sendNewListToRedux()
      return db.database().ref().update(updates)
    })
  }

//--- Confirmation that the user wants to delete a vehicle
  createDeleteAlert = (key, flag) => {
    Alert.alert(
      "Woah There!",
      "Are you sure you want to delete?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", onPress: () => this.updateVehicle(key, flag) }
      ]
    );
  }

// --- Signs current user out
  signoutButtonPressed = () => {
    this.setState({indicator:  true})
    db.auth().signOut()
      .then(() => {
        this.setState({indicator:  false})
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'Landing' }],
        });
      })
      .catch(error => this.setState({errorMessage: error.message}))
  }



// --- Map function for listing elements in vehicleList state
  renderVehicles() {
    return this.state.localVehicleList.map((item) =>
      <View key={item.key} style={Styles.vehiclePadding}>
        <View style={Styles.textContainer}>
          <DeleteButton onPress = {() => this.createDeleteAlert(item.key, true)}/>
          <TouchableOpacity onPress={() => this.editVehicleFlag(item.key)}>
            <View style={Styles.vehicleTile}>
              <Text style={Styles.vehicleTileTextTitle}>
                {item.value.model}{" "}
                {item.value.submodel}{(item.value.submodel==="") ? "" : " "}
              </Text>
              <Text style={Styles.vehicleTileTextContext}>
                {item.value.year}{" "}
                {item.value.make}{" "}
                {item.value.color}
              </Text>
            </View>
          </TouchableOpacity>
          <EditButton onPress = {() => this.editVehicleFlag(item.key)}/>
        </View>
      </View>
    );
  }

  render() {
    const addVehicleFalse =
    <ScrollView>
      <View style = {Styles.container}>
        <Text style = {[Styles.homeText, Styles.homeTextSmaller]}>
          What's in your garage?
        </Text>
        <View style={Styles.screenContainer}>
          {this.renderVehicles()}
        </View>
        <View style = {Styles.screenContainer}>
          <CustomIconButton
            onPress = {this.setVehicleFlag}
            title = "Add Vehicle"
            icon = "plus-square"
          />
        </View>
        <View style = {Styles.screenContainer}>
          <CustomIconButton
            onPress = {() => this.props.navigation.navigate("LinkMedia")}
            title = "Link Socials"
            icon = "link"
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
      </View>
    </ScrollView>;

    const addVehicleTrue =
    <View style = {Styles.userInfoContainer}>
      <View style = {Styles.UserInfoEntryContainer}>
      {(this.state.editVehicleFlag)
        ? <Text style = {Styles.homeText}> Edit a Vehicle</Text>
        : <Text style = {Styles.homeText}> Add a Vehicle</Text>}
        <View style = {Styles.screenContainer}>
          <TextInput
            placeholder = "Year (ex. 2020)"
            placeholderTextColor = "silver"
            value={this.state.year}
            keyboardType = "numeric"
            onFocus = {this.onFocusMake}
            onBlur = {this.onFocusMake}
            style = {[Styles.buttonContainer, (this.state.isFocusedMake) ? Styles.textEntryFocused : Styles.textEntry, Styles.textEntryOverlay]}
            onChangeText = {text => this.setState({year: text})}
          />
        </View>
        <View style = {Styles.screenContainer}>
          <TextInput
            placeholder = "Make (ex. Honda)"
            placeholderTextColor = "silver"
            value = {this.state.make}
            onFocus = {this.onFocusMake}
            onBlur = {this.onFocusMake}
            style = {[Styles.buttonContainer, (this.state.isFocusedMake) ? Styles.textEntryFocused : Styles.textEntry, Styles.textEntryOverlay]}
            onChangeText = {text => this.setState({make: text})}
          />
        </View>
        <View style = {Styles.screenContainer}>
          <TextInput
            placeholder = "Model (ex. Civic)"
            placeholderTextColor = "silver"
            value = {this.state.model}
            onFocus = {this.onFocusMake}
            onBlur = {this.onFocusMake}
            style = {[Styles.buttonContainer, (this.state.isFocusedMake) ? Styles.textEntryFocused : Styles.textEntry, Styles.textEntryOverlay]}
            onChangeText = {text => this.setState({model: text})}
          />
        </View>
        <View style = {Styles.screenContainer}>
          <TextInput
            placeholder = "Trim (ex. Si) (optional)"
            placeholderTextColor = "silver"
            value = {this.state.submodel}
            onFocus = {this.onFocusMake}
            onBlur = {this.onFocusMake}
            style = {[Styles.buttonContainer, (this.state.isFocusedMake) ? Styles.textEntryFocused : Styles.textEntry, Styles.textEntryOverlay]}
            onChangeText = {text => this.setState({submodel: text})}
          />
        </View>
        <View style = {Styles.screenContainer}>
          <TextInput
            placeholder = "Color (ex. Crystal Black Pearl)"
            placeholderTextColor = "silver"
            value = {this.state.color}
            onBlur = {this.onFocusMake}
            style = {[Styles.buttonContainer, (this.state.isFocusedMake) ? Styles.textEntryFocused : Styles.textEntry, Styles.textEntryOverlay]}
            onChangeText = {text => this.setState({color: text})}
          />
        </View>
        <View style = {Styles.screenContainer}>
          <TextInput
            placeholder = "Description (optional)"
            placeholderTextColor = "silver"
            value = {this.state.description}
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
          onPress = {(this.state.editVehicleFlag)? this.editVehicleComponent : this.addVehicleComponent}
          title = "Done"
         />
      </View>
      <View>
        <Text style={Styles.errorText}> {this.state.errorMessage} </Text>
      </View>
    </View>;


    return (
      <View style = {Styles.container}>
        <Spinner
          visible={this.state.indicator}
        />
        <View>
          {(this.isAddorEdit())
            ? addVehicleTrue
            : addVehicleFalse
          }
        </View>
      </View>
     );
  };
}

const CustomIconButton = ({ onPress, title, icon }) => (
  <TouchableOpacity onPress={onPress} style={[Styles.buttonContainer, Styles.solidButtonContainer]}>
    <View style = {Styles.inlineContainer}>
      {({icon}==="") ? null : <FontAwesomeIcon icon={icon} size ={26} color={Styles.container.backgroundColor}/>}
      <Text style={[Styles.buttonText, Styles.solidButtonText]}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const InlineButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={[Styles.buttonContainer, Styles.solidButtonContainer, Styles.inlineButtonContainer]}>
    <Text style={[Styles.buttonText, Styles.solidButtonText]}>{title}</Text>
  </TouchableOpacity>
);

const SignOutButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={[Styles.buttonContainer, Styles.solidButtonContainer, Styles.solidRedButton]}>
    <View style = {Styles.inlineContainer}>
      <FontAwesomeIcon icon="sign-out-alt" size ={26} color={Styles.container.backgroundColor}/>
      <Text style={[Styles.buttonText, Styles.solidButtonText]}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const DeleteButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <FontAwesomeIcon icon="trash-alt" size ={20} color={Styles.solidRedButton.backgroundColor}/>
  </TouchableOpacity>
);
const EditButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <FontAwesomeIcon icon="edit" size ={20} color='mediumseagreen'/>
  </TouchableOpacity>
);


const mapStateToProps = (state) => {
  const { vehicleList } = state
  return { vehicleList }
};

export default connect(mapStateToProps)(UserInfo);
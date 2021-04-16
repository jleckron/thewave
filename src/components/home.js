/**

  home.js is the landing page after a successful sign up for first time user
  

  Displays the vehicles you have in your garage
    - Allows you to choose which you are currently driving
    - Nav to edit garage and other personal information
    - Nav to Log of passed users


*/
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Spinner from 'react-native-loading-spinner-overlay'

import { connect } from 'react-redux';
import { listUpdater } from '../actions/updater'

import Styles from '../styles/styles'

import "firebase/auth"
import { db } from '../config'

class Home extends Component{
  constructor(props) {
    super(props);

    this.state = {
      indicator: false,
      localVehicleList: [],
    };
  }

// ComponentDidMount loads the vehiclesList from firbase
// Calls retrieveVehicleData
  componentDidMount() {
    this.setState({indicator:  true})
    var tempList = []
    db.auth().onAuthStateChanged((user) => {
      if(user) {
        db.database().ref('users').child(user.uid).child('registeredVehicles')
          .once("value", function(snapshot) {
            snapshot.forEach(function(data){
              tempList.push(data.val().vehicleID)
            })
          })
          .then(() => {
            if(tempList === undefined || tempList.length === 0){
              this.setState({indicator:  false})
              return
            }
            else{
              this.retrieveVehicleData(tempList)
            }
          })
      }
    })
  }

  retrieveVehicleData = (tempIDList) => {
    var tempvehicleList =[]
    for(let i=0; i<tempIDList.length; i++){
      db.database().ref('vehicles').child(tempIDList[i])
        .once("value", function(snapshot) {
          tempvehicleList.push({
            key: tempIDList[i],
            value: snapshot.val()
          });
        })
        .then(() => {
          this.setState({
            localVehicleList: tempvehicleList,
            indicator:  false,
          })
        })
        this.props.dispatch(listUpdater(tempvehicleList))
    }
  }
//--------------------------------------------------------------------------


// --- Map function for listing elements in vehicleList state
  renderVehicles() {
    return this.props.vehicleList.vehicleList.map((item) => 
      <View key={item.key} style={Styles.vehiclePadding}>
        <View style={Styles.textContainer}>
          <TouchableOpacity>
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
        </View>
      </View>
    );
  }

  render() {

    const vehicleView =
    <View style = {Styles.container}>
      <Text style = {[Styles.homeText, Styles.homeTextSmaller]}>
        What are you driving?
      </Text>
      <View>
        <View style={Styles.screenContainer}>
          {this.renderVehicles()}
        </View>
        <View style = {[Styles.screenContainer, Styles.inlineContainer]}>
          <InlineButtonIconLeft
              onPress = {this.setVehicleFlag}
              title = "Log"
              icon = "chevron-left"
          />
          <InlineButtonIconRight
            onPress = {() => { this.props.navigation.navigate('UserInfo', {
              refreshList: this.refreshList }) 
            }}
            title = "Edit"
            icon = "edit"
          />
        </View>
      </View>
    </View>;

    return (
      <View style = {Styles.container}>
        <Spinner
          visible={this.state.indicator}
        />
        <View>
          {vehicleView}
        </View>
      </View>
     );
  };
}

const InlineButtonIconLeft = ({ onPress, title, icon }) => (
  <TouchableOpacity onPress={onPress} style={[Styles.buttonContainer, Styles.solidButtonContainer, Styles.inlineButtonContainer]}>
    <View style = {Styles.inlineContainer}>
      {({icon}==="") ? null : <FontAwesomeIcon icon={icon} size ={26} color={Styles.container.backgroundColor}/>}
      <Text style={[Styles.buttonText, Styles.solidButtonText]}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const InlineButtonIconRight = ({ onPress, title, icon }) => (
  <TouchableOpacity onPress={onPress} style={[Styles.buttonContainer, Styles.solidButtonContainer, Styles.inlineButtonContainer]}>
    <View style = {Styles.inlineContainer}>
      <Text style={[Styles.buttonText, Styles.solidButtonText]}>{title}</Text>
      {({icon}==="") ? null : <FontAwesomeIcon icon={icon} size ={26} color={Styles.container.backgroundColor}/>}
    </View>
  </TouchableOpacity>
);


const mapStateToProps = (state) => {
  const { vehicleList } = state
  return { vehicleList }
};
 
export default connect(mapStateToProps)(Home);
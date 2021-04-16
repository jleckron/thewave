/**

    This page contains home page and initial naviagtion logic

    -----> Must still implement persistence <-----

*/
// splash screen: https://medium.com/handlebar-labs/how-to-add-a-splash-screen-to-a-react-native-app-ios-and-android-30a3cec835ae
// persistence: https://rnfirebase.io/auth/usage
// Redux https://code.tutsplus.com/tutorials/using-redux-in-a-react-native-app--cms-36001

import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { enableScreens } from 'react-native-screens'

import { createStore } from 'redux'
import { Provider } from 'react-redux'


import { library } from '@fortawesome/fontawesome-svg-core'
import {  faPlusSquare, 
          faTrashAlt, 
          faEdit, 
          faSignOutAlt, 
          faLink,
          faChevronLeft, 
        } from '@fortawesome/free-solid-svg-icons'


import Styles from './src/styles/styles'
import UserLogin from './src/components/userLogin'
import UserSignup from './src/components/userSignup'
import LandingPage from './src/components/landingPage'
import Home from './src/components/home'
import UserInfo from './src/components/userInfo'
import PassRecover from './src/components/passRecover'
import LinkMedia from './src/components/linkMedia'

import updateReducer from './src/reducers/updateReducer'

enableScreens();


library.add(faPlusSquare, faTrashAlt, faEdit, faSignOutAlt, faLink, faChevronLeft );
const Stack = createStackNavigator();

const store = createStore(updateReducer)


//Main app component - Contains navigation stack
export default class App extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Styles.container.backgroundColor,
                shadowColor: 'transparent',
              },
              headerTintColor: Styles.highlight.backgroundColor,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            <Stack.Screen
              name = "Landing"
              component = {LandingPage}
              options = {{gestureEnabled: false, title: ""}}
            />
            <Stack.Screen
              name = "UserLogin"
              component = {UserLogin}
              options = {{title: "Login"}}
            />
            <Stack.Screen
              name = "PassRecover"
              component = {PassRecover}
              options = {{title: "Reset Password"}}
            />
            <Stack.Screen
              name = "UserSignup"
              component = {UserSignup}
              options = {{title: "Sign Up"}}
            />
            <Stack.Screen
              name = "Home"
              component = {Home}
              options = {{title: "Home"}}
            />
            <Stack.Screen
              name = "UserInfo"
              component = {UserInfo}
              options = {{title: "Your information"}}
            />
            <Stack.Screen
              name = "LinkMedia"
              component = {LinkMedia}
              options = {{title: "Link your social medias"}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  };
};
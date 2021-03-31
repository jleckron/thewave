/**

    This page contains home page and initial naviagtion logic

    -----> Must still implement persistence, user reset password <-----

*/
// splash screen: https://medium.com/handlebar-labs/how-to-add-a-splash-screen-to-a-react-native-app-ios-and-android-30a3cec835ae
// persistence: https://rnfirebase.io/auth/usage

import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { enableScreens } from 'react-native-screens'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusSquare, faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons'


import Styles from './src/styles/styles'
import UserLogin from './src/pages/userLogin'
import UserSignup from './src/pages/userSignup'
import LandingPage from './src/pages/landingPage'
import Home from './src/pages/home'
import UserInfo from './src/pages/userInfo'
import PassRecover from './src/pages/passRecover'

enableScreens();


library.add(faPlusSquare, faTrashAlt, faEdit);
const Stack = createStackNavigator();

//Main app component - Contains navigation stack
export default class App extends Component {
 render(){
   return (
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
         }}
       >
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
           options = {{title: "What do you drive?"}}
         />
       </Stack.Navigator>
     </NavigationContainer>

   );
 };
};

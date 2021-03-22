/**

styles.js holds styles to be used by all pages

Colors can be easily reconfigured by altering color and highlight

const color = background color
const highlight = highlight color

*/

import { StyleSheet, Platform } from 'react-native'
import { Dimensions } from 'react-native'

import { DynamicColorIOS } from 'react-native'

const customDynamicTextColor = DynamicColorIOS({
  dark: 'lightskyblue',
  light: 'midnightblue'
});


const windowWidth = Dimensions.get('window').width;
const width = .65*windowWidth;

const color = '#fffdf2';
const highlight = 'slateblue';

const Styles = StyleSheet.create({
  buttonContainer: {
    elevation: 8,
    borderRadius: 10,
    borderColor: highlight,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: highlight,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  clearButtonContainer:{
    backgroundColor: "transparent",
    width: width,
  },
  clearButtonText: {
    color: highlight
  },
  container: {
    flex: 1,
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    padding: 10,
    fontWeight: 'bold',
  },
  highlight: {
    backgroundColor: highlight,
  },
  homeText: {
    fontSize: 40,
    fontWeight: '600',
    color: highlight,
    paddingBottom: 20
  },
  inlineButtonContainer: {
    width: width/2 - (.075*width),
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  rowSpaceBetweenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  screenContainer: {
    paddingBottom: 16
  },
  solidButtonContainer: {
    backgroundColor: highlight,
    width: width,
  },
  solidRedButton: {
    backgroundColor: "red",
  },
  solidButtonText: {
    color: color,
  },
  signupText: {
    fontSize: 14,
    color: 'black',
    alignSelf: "center",
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textEntry: {
    backgroundColor: color,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    width: width,
    paddingTop: 15,
  },
  textEntryError: {
    backgroundColor: color,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 15,
    width: width,
    paddingTop: 15,
  },
  textEntryFocused: {
    backgroundColor: color,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 15,
    width: width,
    paddingTop: 15,
  },
  textEntryOverlay: {
    backgroundColor: 'lightgrey',
    opacity: .75,
  },
  userInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  UserInfoEntryContainer: {
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehiclePadding: {
    paddingBottom: 10,
  },
  vehicleTile: {
    justifyContent: 'center',
    elevation: 8,
    borderRadius: 10,
    borderColor: 'lightgrey',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: width,
  },

});

export default Styles;

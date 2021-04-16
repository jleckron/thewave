/**

styles.js holds styles to be used by all pages

Colors can be easily reconfigured by altering color and highlight

const color = background color
const highlight = highlight color

*/

import { StyleSheet, Dimensions, DynamicColorIOS } from 'react-native'

const customDynamicTextColor = DynamicColorIOS({
  dark: 'lightskyblue',
  light: 'midnightblue'
});

const windowWidth = Dimensions.get('window').width;
const width = .65*windowWidth;

const color = '#424242';
const highlight = '#00bfa9';
const redShade = '#ff5454';
const blueShade = 'lightblue';

const Styles = StyleSheet.create({
  buttonContainer: {
    elevation: 8,
    borderRadius: 10,
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
    borderColor: highlight,
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
    color: redShade,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
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
  homeTextSmaller: {
    fontSize: 32,
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
    borderColor: "transparent",
    width: width,
  },
  solidRedButton: {
    backgroundColor: redShade,
  },
  solidButtonText: {
    color: color,
  },
  signupText: {
    fontSize: 14,
    color: 'white',
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
    borderRadius: 5,
    width: width,
    paddingTop: 15,
    color: 'white',
  },
  textEntryError: {
    backgroundColor: color,
    borderColor: redShade,
    borderWidth: 2,
  },
  textEntryFocused: {
    backgroundColor: color,
    borderColor: blueShade,
  },
  textEntryOverlay: {
    backgroundColor: color,
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
    marginLeft: 10,
    marginRight: 10,
    width: width,
  },
  vehicleTileTextContext: {
    color: 'white',
  },
  vehicleTileTextTitle: {
    fontWeight: '600',
    fontSize: 20,
    color: 'white',
  },


});

export default Styles;

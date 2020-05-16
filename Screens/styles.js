import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const height=Dimensions.get('window').height;
const width=Dimensions.get('window').width;
const styles=StyleSheet.create({
gmail: {
    flexDirection: 'row',
    width: width*0.58,
    borderWidth:2,
    backgroundColor:'mediumturquoise',
    marginLeft:'25%',
    paddingBottom:'10%',
    marginTop:'23%',
    borderRadius:2,
    height: height*0.05,
    borderColor:'mediumturquoise'
},
email: {
    flexDirection:'row',
    height:height*0.07,
    width: width*0.8,
    borderWidth: 3,
    marginLeft:'10%',
    borderRadius: 8,
    marginTop:'45%',
    backgroundColor:'white'
},
user: {
    flexDirection:'row',
    height:height*0.07,
    width: width*0.8,
    borderWidth: 3,
    marginLeft:'10%',
    borderRadius: 8,
    marginTop:'10%',
    backgroundColor:'white'
},
submitButton: {
    width: width*0.35,
    height: height*0.06,
    borderWidth: 4,
    borderRadius: 9,
    marginTop:'20%',
    marginLeft:'33%',
    backgroundColor:'dodgerblue',
    borderColor:'midnightblue',
    flexDirection:'row'
},
icon:{
    height:30, 
    width:30, 
    marginTop:6, 
    marginLeft:2
},
loginButton: {
    width: width*0.35,
    height: height*0.06,
    borderWidth: 4,
    borderRadius: 9,
    marginTop:'2%',
    marginLeft:'33%',
    backgroundColor:'dodgerblue',
    borderColor:'midnightblue',
    flexDirection:'row'
},
text: {
    fontSize:23, 
    fontWeight:'bold', 
    color:'mistyrose', 
    fontFamily:'monospace'
}

});
export default styles;
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({

    email: {
        flexDirection: 'row',
        height: height * 0.07,
        width: width * 0.8,
        borderWidth: 3,
        marginLeft: '10%',
        borderRadius: 8,
        marginTop: '45%',
        backgroundColor: 'white'
    },
    user: {
        flexDirection: 'row',
        height: height * 0.07,
        width: width * 0.8,
        borderWidth: 3,
        marginLeft: '10%',
        borderRadius: 8,
        marginTop: '10%',
        backgroundColor: 'white'
    },
    submitButton: {
        width: width * 0.35,
        height: height * 0.06,
        borderWidth: 4,
        borderRadius: 9,
        marginTop: '20%',
        marginLeft: '33%',
        backgroundColor: 'dodgerblue',
        borderColor: 'midnightblue',
        flexDirection: 'row'
    },
    icon: {
        height: 30,
        width: 30,
        marginTop: 6,
        marginLeft: 2
    },
    loginButton: {
        width: width * 0.35,
        height: height * 0.06,
        borderWidth: 4,
        borderRadius: 9,
        marginTop: '2%',
        marginLeft: '33%',
        backgroundColor: 'dodgerblue',
        borderColor: 'midnightblue',
        flexDirection: 'row'
    },
    text: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'mistyrose',
        fontFamily: 'monospace'
    },
    addButton: {
        display: "flex",
        position: "absolute",
        bottom: '10%',
        right: '3%'
    },
    addCancelButton: {
        borderWidth:2,
        borderRadius:3,
        borderColor:'steelblue',
        height: 35,
        width:90,
        marginRight:'7%',
        backgroundColor:'steelblue'
    },
    addCancelText:{
        alignSelf:'center',
        fontSize:16,
        fontWeight:'bold',
        fontFamily:'monospace',
        marginTop:'4%',
        color: 'white'
    }
});
export default styles;
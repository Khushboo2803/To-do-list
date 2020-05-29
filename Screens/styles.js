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
        marginTop: '29%',
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
    //
    submitButton: {
        width: width * 0.42,
        height: height * 0.06,
        borderWidth: 4,
        borderRadius: 9,
        marginTop: '10%',
        marginLeft: '33%',
        backgroundColor: 'dodgerblue',
        borderColor: 'midnightblue',
        flexDirection: 'row',
    },
    icon: {
        height: height*0.04,
        width: width*0.08,
        marginTop: 6,
        marginLeft: 2
    },
    loginButton: {
        width: width * 0.42,
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
        fontFamily: 'monospace',
        textAlign: 'center'
    },
    addButton: {
        display: "flex",
        position: "absolute",
        bottom: height*0.05,
        right: width*0.01
    },
    addCancelButton: {
        borderWidth: 2,
        borderRadius: 3,
        borderColor: 'green',
        height: 35,
        width: 90,
        marginRight: '7%',
        backgroundColor: 'green'
    },
    addCancelText: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        marginTop: '4%',
        color: 'white'
    },
    deteleTask: {
        position: "absolute",
        right: 0,
        top: 0,

    },
    //
    forgetText:
    {
        fontStyle: 'italic',
        color: 'navy',
        fontWeight: 'bold',
        fontSize: 20,
        textDecorationLine: 'underline',
        textShadowRadius: 90,
        textShadowColor: 'white'
    },
    updateButton: {
        height: 30,
        width: 90,
        backgroundColor: 'green',
        borderRadius: 4,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: '5%'
    },
    updateText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 16,
        fontFamily: 'monospace',
        fontWeight: 'bold'
    },
    filterButton: {
        alignSelf:'center',
        borderWidth:2,
        borderRadius:10,
        width: Dimensions.get('screen').width*0.30,
        height: Dimensions.get('screen').height*0.05,
        backgroundColor:'green',
        marginTop:10

    },
    filterView: {
            height: 35,
            width: '100%',
            backgroundColor: 'lightgrey',
            flexDirection: 'row',
            left: 2,
            borderTopWidth:4,
            borderTopColor:'green',
            width:width*0.50
    }
});
export default styles;
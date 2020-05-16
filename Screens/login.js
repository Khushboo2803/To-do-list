import React from 'react';
import {Text, ImageBackground, Dimensions, StyleSheet, View, Image, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles.js';
export default class login extends React.Component
{
    constructor(props)
    {
        super()
        this.state={
            username:'',
            email:'',
            password:'',
            width:'',
            height: ''
        };
    }

    UNSAFE_componentWillMount()
    {
        this.setState({width: Dimensions.get('window').width});
        this.setState({height:Dimensions.get('window').height});
    }

    render()
    {
        return(
            <ImageBackground source={require('../assets/login.jpg')}
            style={{height: this.state.height, width: this.state.width}}>
                <View>
                <View style={styles.email}>
                    <Image source={require('../assets/email.png')}
                    style={styles.icon} />
                    <TextInput
                        placeholder="Enter your email id here                 "
                        underlineColorAndroid="transparent"
                        onChangeText={text=>this.setEmail(text)}
                        defaultValue={this.state.email}
                        style={{
                            color: 'navy',
                            fontFamily: 'monospace'
                        }}
                    />
                </View>

                <View style={styles.user}>
                    <Image source={require('../assets/pass.png')}
                    style={styles.icon} />
                    <TextInput
                        placeholder="Enter your password here                 "
                        underlineColorAndroid="transparent"
                        onChangeText={text=>this.setPass(text)}
                        defaultValue={this.state.password}
                        secureTextEntry={true}
                        style={{
                            color: 'navy',
                            fontFamily: 'monospace'
                        }}
                    />
                </View>

                <View style={styles.submitButton}>
                    
                    <TouchableOpacity onPress={()=>{this.onSubmitPress()}}>
                        <Text style={styles.text}>>>Login </Text>
                    </TouchableOpacity>
                </View>
                </View>
            </ImageBackground>
        );
    }
}
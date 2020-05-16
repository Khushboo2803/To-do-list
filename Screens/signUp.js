import React from 'react';
import { ImageBackground, StyleSheet, Dimensions, View, TouchableOpacity, Text, Alert,Image } from 'react-native';
import styles from './styles.js';
import AccountManager from 'react-native-account-manager';
import { TextInput } from 'react-native-gesture-handler';
export default class signUp extends React.Component
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

    getDeviceMail()
    {
        Alert.alert("signup module here");
    }

    setEmail(mail)
    {
        this.setState({email:mail});
    }
    setUser(user)
    {
        this.setState({username:user});
    }
    setPass(pass)
    {
        this.setState({password:pass});
    }

    onSubmitPress()
    {
        Alert.alert(this.state.password);
    }
    render()
    {
        return(
            <ImageBackground source={require('../assets/signUp.jpg')}
            style={{
                height: this.state.height,
                width: this.state.width
            }}>
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
                    <Image source={require('../assets/user.jpg')}
                    style={styles.icon} />
                    <TextInput
                        placeholder="Enter your name here                 "
                        underlineColorAndroid="transparent"
                        onChangeText={text=>this.setUser(text)}
                        defaultValue={this.state.username}
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
                        <Text style={{fontSize:23, fontWeight:'bold', color:'mistyrose', fontFamily:'monospace'}}>>>Submit </Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.gmail}>
                    <Image source={require('../assets/gmail.png')}
                    style={{height:35, width:35, borderRadius:15}}/>

                    <TouchableOpacity onPress={()=>{this.getDeviceMail()}}>
                        <Text style={{
                            fontSize:18,
                            marginTop:3
                        }}> Sign-up using gmail </Text>
                    </TouchableOpacity>
                </View>
                </View>
            </ImageBackground>
        );
    }
}
 
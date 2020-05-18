import React from 'react';
import { ImageBackground, StyleSheet, Dimensions, View, TouchableOpacity, Text, Alert,Image, Button, BackHandler } from 'react-native';
import styles from './styles.js';
import { TextInput } from 'react-native-gesture-handler';
import fun from '../functions/fun';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    ScaleAnimation
} from 'react-native-popup-dialog';

export default class signUp extends React.Component
{
    constructor(props)
    {
        super()
        this.state={
            username:null,
            email:'',
            password:'',
            width:'',
            height: '',
            dialogBox: false,
            otp: '',
            resendBox: false
        };
    }
    interval='';
    i='';
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

    setOTP(otp)
    {
        this.setState({otp:otp});
    }

    setTimer(i)
    {
        if(this.i==30)
        {
            this.setState({resendBox: false})
        }
        else if(this.i==0)
        {
            clearInterval(this.interval);
            this.setState({resendBox: true})
        }
        console.log(this.i);
        this.i=this.i-1;
    }
    onSubmitPress=async()=>
    {   this.setState({resendBox: false});
        if(await fun.signupValidation(this.state.email, this.state.password,this.state.username))
        {  
            this.setState({dialogBox: true});
            this.i=30;
            this.interval=setInterval(()=>{
                this.setTimer(this.i);
            }, 1000)
        }
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
                        <Text style={styles.text}>>>Submit </Text>
                    </TouchableOpacity>
                </View>
                <Text style={{
                    marginLeft:'45%',
                    fontFamily:'monospace',
                    fontSize:16,
                    color:'white'
                }}>OR</Text>

                <View style={styles.loginButton}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('login')}}>
                        <Text style={styles.text}>>>Login </Text>
                    </TouchableOpacity>
                </View>

                <Dialog onTouchOutside={()=>{this.setState({dialogBox: true});
                }}
                width={0.9}
                visible={this.state.dialogBox}
                dialogAnimation={new ScaleAnimation()}
                onHardwareBackPress={()=>{
                    BackHandler.exitApp();
                    clearInterval(this.interval);
                    console.log('onHardwareBackPress');
                    this.setState({dialogBox: false});
                    return true;
                }}
                dialogTitle={
                    <DialogTitle 
                    title="Enter OTP"
                    hasTitleBar={false}
                />
                }
                actions={
                    [
                        <DialogButton
                        text="DISMISS"
                        onPress={()=>{
                            this.setState({dialogBox: false});
                        }}
                        key="button-1"
                        />,
                    ]
                }>
                    <DialogContent>
                        <View>

                            <TextInput
                                placeholder="OTP is sent to your email                 "
                                underlineColorAndroid="transparent"
                                onChangeText={text=>this.setOTP(text)}
                                defaultValue={this.state.otp}
                                keyboardType='numeric'
                                style={{
                                    color: 'navy',
                                    fontFamily: 'monospace'
                                }}
                            />
                            
                            <Button 
                                title="Verify"
                                onPress={()=>{
                                    this.setState({dialogBox: false});
                                    fun.verifyOTP(this.state.email, this.state.otp);
                                    this.props.navigation.navigate('todo');
                                }}
                                key="button-1"
                            />

                        <View style={{
                            marginLeft:'35%',
                            marginTop:'5%'
                        }}>
                        {
                            this.state.resendBox ? 
                            <TouchableOpacity onPress={()=>{
                                this.i=30;
                                this.interval=setInterval(()=>{
                                    this.setTimer(this.i);
                                }, 1000)
                            }}>
                                <Text> Resend OTP </Text>
                            </TouchableOpacity> : null     
                        }
                        </View>
                        </View>
                    </DialogContent>
                </Dialog>
                
                </View>
            </ImageBackground>
        );
    }
}
 
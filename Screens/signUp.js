import React from 'react';
import { ImageBackground, StyleSheet, Dimensions, View, TouchableOpacity, Text, Alert, Image, Button, BackHandler } from 'react-native';
import styles from './styles.js';
import { TextInput } from 'react-native-gesture-handler';
import user from '../functions/user';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    ScaleAnimation
} from 'react-native-popup-dialog';
import AsyncStorage from '@react-native-community/async-storage';

export default class signUp extends React.Component {
    constructor(props) {
        super()
        this.state = {
            username: null,
            email: '',
            password: '',
            dialogBox: false,
            otp: '',
            resendBox: false,
            id: ''
        };
    }
    interval = '';
    i = '';
    async UNSAFE_componentWillMount() {
        {/** check if user is already logged in */}
        const user = await AsyncStorage.getItem('user');
        const id = await AsyncStorage.getItem('id');
        if (id == '' || id == null) {
            this.render();
        }
        else {
            {/** if id found in device storage then navigate to todo screen */}
            this.props.navigation.navigate('todo');
        }
    }

    setTimer(i) {
        {/** Timer set to enable resend option for otp */}
        if (this.i == 30) {
            this.setState({ resendBox: false })
        }
        else if (this.i == 0) {
            clearInterval(this.interval);
            this.setState({ resendBox: true })
        }
        console.log(this.i);
        this.i = this.i - 1;
    }
    onSubmitPress = async () => {
        {/** user requests to sign-up */}
        this.setState({ resendBox: false });
        if (await user.signupValidation(this.state.email, this.state.password, this.state.username)) {
            {/** Inside 'if' if all fields are in correct format */}
            const id = await user.register(this.state.email.toLowerCase(), this.state.username, this.state.password);
            {/** On success, get user id */}
            this.setState({ id: id });
            if (id !== undefined) {
                {/** Ask for OTP */}
                this.setState({ dialogBox: true });
                this.i = 30;
                this.interval = setInterval(() => {
                    this.setTimer(this.i);
                }, 1000)
            }
            else
                return
        }
    }
    render() {
        return (
            <ImageBackground source={require('../assets/signUp.jpg')}
                style={{
                    height: this.state.height,
                    width: this.state.width
                }}>
                    {/* Email view starts */}
                <View>
                    <View style={styles.email}>
                        <Image source={require('../assets/email.png')}
                            style={styles.icon} />
                        <TextInput
                            placeholder="Enter your email id here                 "
                            underlineColorAndroid="transparent"
                            onChangeText={text => this.setState({ email: text })}
                            defaultValue={this.state.email}
                            style={{
                                color: 'navy',
                                fontFamily: 'monospace'
                            }}
                        />
                    </View>
                        {/* Email view ends here */}

                        {/* User view starts */}
                    <View style={styles.user}>
                        <Image source={require('../assets/user.jpg')}
                            style={styles.icon} />
                        <TextInput
                            placeholder="Enter your name here                 "
                            underlineColorAndroid="transparent"
                            onChangeText={text => this.setState({ user: text })}
                            defaultValue={this.state.username}
                            style={{
                                color: 'navy',
                                fontFamily: 'monospace'
                            }}
                        />
                    </View>
                        {/* User view ends here */}

                        {/* Password view starts */}
                    <View style={styles.user}>
                        <Image source={require('../assets/pass.png')}
                            style={styles.icon} />
                        <TextInput
                            placeholder="Enter your password here                 "
                            underlineColorAndroid="transparent"
                            onChangeText={text => this.setState({ password: text })}
                            defaultValue={this.state.password}
                            secureTextEntry={true}
                            style={{
                                color: 'navy',
                                fontFamily: 'monospace'
                            }}
                        />
                    </View>
                        {/* password view ends here */}

                        {/* submit button */}
                    <View style={styles.submitButton}>

                        <TouchableOpacity onPress={() => { this.onSubmitPress() }}>
                            <Text style={styles.text}>>>Submit </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        marginLeft: '45%',
                        fontFamily: 'monospace',
                        fontSize: 16,
                        color: 'white'
                    }}>OR</Text>

                    {/* login button */}
                    <View style={styles.loginButton}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('login') }}>
                            <Text style={styles.text}>>>Login </Text>
                        </TouchableOpacity>
                    </View>

                    {/* OTP dialog box */}
                    <Dialog onTouchOutside={() => {
                        this.setState({ dialogBox: true });
                    }}
                        width={0.9}
                        visible={this.state.dialogBox}
                        dialogAnimation={new ScaleAnimation()}
                        onHardwareBackPress={() => {
                            BackHandler.exitApp();
                            clearInterval(this.interval);
                            console.log('onHardwareBackPress');
                            this.setState({ dialogBox: false });
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
                                    onPress={() => {
                                        this.setState({ dialogBox: false });
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
                                    onChangeText={text => this.setState({ otp: text })}
                                    defaultValue={this.state.otp}
                                    keyboardType='numeric'
                                    style={{
                                        color: 'navy',
                                        fontFamily: 'monospace'
                                    }}
                                />

                                <Button
                                    title="Verify"
                                    onPress={async () => {
                                        clearInterval(this.interval);
                                        this.setState({ dialogBox: false });
                                        const id = await user.verifyOTP(this.state.id, this.state.otp);
                                        if (id != false) {
                                            console.log('validated');
                                            await AsyncStorage.setItem('id', id);
                                            await AsyncStorage.setItem('user', this.state.username);
                                            this.props.navigation.navigate('todo');
                                        }

                                    }}
                                    key="button-1"
                                />

                                <View style={{
                                    marginLeft: '35%',
                                    marginTop: '5%'
                                }}>
                                    {
                                        this.state.resendBox ?
                                            <TouchableOpacity onPress={async () => {
                                                await user.resendOTP(this.state.id);
                                                this.i = 30;
                                                this.interval = setInterval(() => {
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
                    {/* OTP dialog box ends here */}

                </View>
            </ImageBackground>
        );
    }
}

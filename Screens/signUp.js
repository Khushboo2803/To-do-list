import React from 'react';
import { ImageBackground, StyleSheet, Dimensions, View, TouchableOpacity, Text, Alert, Image, BackHandler } from 'react-native';
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
import { Icon, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';


const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;

export default class signUp extends React.Component {
    constructor(props) {
        super()
        this.state = {
            username: null,
            email: null,
            password: null,
            dialogBox: false,
            otp: '',
            resendBox: false,
            id: '',
            textEntry: true
        };
    }
    interval = '';
    i = '';
    async UNSAFE_componentWillMount() {
        /** check if user is already logged in */
        const id = await AsyncStorage.getItem('id');
        if (id == '' || id == null) {
            this.render();
        }
        else {
            /** if id found in device storage then navigate to todo screen */
            this.props.navigation.navigate('todo');
        }
    }

    setTimer(i) {
        /** Timer set to enable resend option for otp */
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
        /** user requests to sign-up */
        this.setState({ resendBox: false });
        if (await user.signupValidation(this.state.email, this.state.password, this.state.username)) {
            /** Inside 'if' if all fields are in correct format */
            const id = await user.register(this.state.email.toLowerCase(), this.state.username, this.state.password);
            /** On success, get user id */
            this.setState({ id: id });
            if (id !== false) {
                {/** Ask for OTP */ }
                this.setState({ dialogBox: true });
                this.i = 30;
                this.interval = setInterval(() => {
                    this.setTimer(this.i);
                }, 1000)
            }
            else {
                this.setState({
                    email: null,
                    username: null,
                    password: null
                });
                return
            }

        }
    }
    setTextEntry() {
        this.setState({ textEntry: !this.state.textEntry });
        console.log(this.state.textEntry);
    }
    render() {
        return (
            <ImageBackground source={require('../assets/signUp.jpg')}
                style={{
                    height: Height,
                    width: Width
                }}>
                <View>
                    <View style={{
                        marginTop: '10%',
                        alignSelf: 'center'
                    }}>
                        <Text style={{
                            fontSize: 26,
                            fontWeight: 'bold',
                            fontFamily: 'monospace',
                            textShadowRadius: 90,
                            textShadowColor: 'green',
                            color: 'black'
                        }}> Sign-Up for Todo-List</Text>
                    </View>

                    {/* Email view starts */}
                    <View style={styles.email}>
                        <Image source={require('../assets/email.png')}
                            style={styles.icon} />
                        <TextInput
                            placeholder="Enter your email id here                 "
                            underlineColorAndroid="transparent"
                            autoCompleteType="off"
                            onChangeText={text => this.setState({ email: text })}
                            defaultValue={this.state.email}
                            style={{
                                color: 'navy',
                                fontFamily: 'monospace',
                                height: Height * 0.06,
                                width: Width * 0.8
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
                            onChangeText={text => this.setState({ username: text })}
                            defaultValue={this.state.username}
                            style={{
                                color: 'navy',
                                fontFamily: 'monospace',
                                height: Height * 0.06,
                                width: Width * 0.8
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
                            secureTextEntry={this.state.textEntry}
                            style={{
                                color: 'navy',
                                fontFamily: 'monospace',
                                height: Height * 0.06,
                                width: Width * 0.58
                            }}
                        />
                        <TouchableOpacity onPress={() => {
                            this.setTextEntry();
                        }}>
                            <Icon
                                name='eye-slash'
                                type='font-awesome'
                                color='blue'
                                size={Height * 0.04}
                                style={{
                                    left: 0,
                                    alignSelf: 'center',
                                    top: 2
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* password view ends here */}

                    {/* submit button */}
                    <View style={styles.submitButton}>
                        <TouchableOpacity onPress={() => { this.onSubmitPress() }}>
                            <Text style={styles.text}>   Submit</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        marginLeft: Dimensions.get('screen').width * 0.50,
                        fontFamily: 'monospace',
                        fontSize: 16,
                        color: 'black'
                    }}>OR</Text>

                    {/* login button */}
                    <View style={styles.loginButton}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('login')}
                            style={{ flexDirection: 'row' }}>
                            <Icon
                                name="sign-in"
                                type="font-awesome"
                                size={Height * 0.04}
                                color='white'
                                iconStyle={{ marginLeft: Width * 0.05 }}
                            />
                            <Text style={styles.text}> Login </Text>
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
                                    placeholder="Enter OTP here                 "
                                    underlineColorAndroid="green"
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
                                            await AsyncStorage.setItem('id', id);
                                            await AsyncStorage.setItem('user', this.state.username);
                                            this.props.navigation.navigate('todo');
                                        }
                                        else{
                                            this.setState({otp: null});
                                            clearInterval(this.interval);
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
                {/* share button */}
                <View style={{
                    marginLeft: Width * 0.43,
                    marginTop: '10%'
                }}>
                    <Icon
                        raised
                        reverse
                        name="share"
                        type="fontisto"
                        color="blue"
                        size={25}
                        onPress={() => {
                            user.shareMessage();
                        }}
                    />
                </View>
            </ImageBackground >
        );
    }
}

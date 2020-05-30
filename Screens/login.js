import React from 'react';
import { Text, ImageBackground, Dimensions, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert, Button, BackHandler } from 'react-native';
import styles from './styles.js';
import user from '../functions/user';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogButton,
    ScaleAnimation
} from 'react-native-popup-dialog';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';

const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;
export default class login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            dialogBox: false,
            textEntry: true
        };
    }

    setTextEntry() {
        this.setState({ textEntry: !this.state.textEntry });
        console.log(this.state.textEntry);
    }

    loginUser = async () => {
        /* function called on login press */
        if (await user.signupValidation(this.state.email, this.state.password, "default")) {
            /*if format of input is correct */
            const res = await user.login(this.state.email.toLowerCase(), this.state.password);
            /* res is the response we get from backend */
            if (res !== false) {
                // if the user exist
                AsyncStorage.setItem('id', res._sid);
                AsyncStorage.setItem('user', res.name);
                this.props.navigation.navigate('todo');
            }
            else
                return;
        }

    }
    render() {
        return (
            <ImageBackground source={require('../assets/login.jpg')}
                style={{
                    height: Height,
                    width: Width
                }}>
                <View>
                    <View style={{
                        marginTop: Height * 0.10,
                        alignSelf: 'center'
                    }}>
                        <Text style={{
                            fontSize: 26,
                            fontWeight: 'bold',
                            fontFamily: 'monospace',
                            textShadowRadius: 90,
                            textShadowColor: 'green',
                            color: 'black'
                        }}> Login for Todo-List</Text>
                    </View>
                    {/* email text input view */}
                    <View style={styles.email}>
                        <Image source={require('../assets/email.png')}
                            style={styles.icon} />
                        <TextInput
                            placeholder="Enter your email id here                 "
                            underlineColorAndroid="transparent"
                            autoCompleteType="off"
                            onChangeText={text => this.setState({ email: text })}
                            keyboardType='email-address'
                            defaultValue={this.state.email}
                            style={{
                                color: 'navy',
                                fontFamily: 'monospace',
                                height: Height * 0.06,
                                width: Width * 0.8
                            }}
                        />
                    </View>
                    {/* Email TextInput ends here */}

                    {/* password textinput view */}
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
                                }} />
                        </TouchableOpacity>
                    </View>
                    {/* password textinput view ends here */}

                    {/* forget password */}
                    <View style={{
                        marginLeft: Dimensions.get('screen').width * 0.43,
                        marginTop: '5%'
                    }}>
                        <TouchableOpacity onPress={() => {
                            this.setState({ dialogBox: true });
                        }}>
                            <Text style={styles.forgetText}>
                                Forget Password ?
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* forget passwords ends here */}

                    <View style={styles.submitButton}>
                        <TouchableOpacity onPress={() => this.loginUser()}>
                            <Text style={styles.text}>   Login</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{
                        marginLeft: Dimensions.get('screen').width * 0.49,
                        fontFamily: 'monospace',
                        fontSize: 16,
                        color: 'black',
                        fontWeight: "bold"
                    }}>OR</Text>

                    <View style={styles.loginButton}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                            style={{ flexDirection: 'row' }}>
                            <Icon
                                name="book"
                                type="font-awesome"
                                size={Height * 0.04}
                                color='white'
                                iconStyle={{ marginLeft: Width * 0.05 }}
                            />
                            <Text style={styles.text}> Register</Text>
                        </TouchableOpacity>
                    </View>

                    {/* forget password dialog box {callable only when user press forget password button} */}

                    <Dialog onTouchOutside={() => {
                        this.setState({ dialogBox: false });
                    }}
                        width={0.9}
                        visible={this.state.dialogBox}
                        dialogAnimation={new ScaleAnimation()}
                        onHardwareBackPress={() => {
                            clearInterval(this.interval);
                            console.log('onHardwareBackPress');
                            this.setState({ dialogBox: false });
                            return true;
                        }}
                        dialogTitle={
                            <DialogTitle
                                title="Enter registered email"
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
                        {/* dialog box body */}
                        <DialogContent>
                            <View>
                                <TextInput
                                    placeholder="Temporary password will be sent to your email                            "
                                    underlineColorAndroid="transparent"
                                    onChangeText={text => this.setState({ email: text })}
                                    defaultValue={this.state.email}
                                    keyboardType='email-address'
                                    style={{
                                        color: 'navy',
                                        fontSize: 13
                                    }}
                                />
                                <Button
                                    title="Reset Password"
                                    onPress={async () => {
                                        await user.forgetPass(this.state.email.toLowerCase());
                                        this.setState({ email: '' });
                                    }}
                                    key="button-1"
                                />
                            </View>
                        </DialogContent>
                        {/* dialog box body ends here */}
                    </Dialog>
                    {/* forget password dialog box ends here */}

                </View>

                {/* Share button */}
                <View style={{
                    marginLeft: Dimensions.get('screen').width * 0.45,
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
            </ImageBackground>
        );
    }
}
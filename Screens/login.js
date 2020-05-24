import React from 'react';
import { Text, ImageBackground, Dimensions, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert, Button, BackHandler} from 'react-native';
import styles from './styles.js';
import user from '../functions/user';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    ScaleAnimation
} from 'react-native-popup-dialog';
import AsyncStorage from '@react-native-community/async-storage';

export default class login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            width: '',
            height: '',
            dialogBox: false
        };
    }

    UNSAFE_componentWillMount() {
        this.setState({ width: Dimensions.get('window').width });
        this.setState({ height: Dimensions.get('window').height });
    }

    loginUser = async () => {

        if (await user.signupValidation(this.state.email, this.state.password, "default")) {
            const res = await user.login(this.state.email.toLowerCase(), this.state.password);
            console.log("result after login",res);
            if (res !== false) {
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
                style={{ height: this.state.height, width: this.state.width }}>
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

                    {/* forget password */}
                    <View style={{
                        marginLeft:'43%',
                        marginTop:'5%'
                    }}>
                        <TouchableOpacity onPress={()=>{
                            this.setState({dialogBox: true});
                        }}>
                            <Text style={styles.forgetText}>
                            Forget Password ?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.submitButton}>

                        <TouchableOpacity onPress={() => this.loginUser()}>
                            <Text style={styles.text}>>>Login </Text>
                        </TouchableOpacity>
                    </View>

                    {/* forget password dialog box  */}
                    
                    <Dialog onTouchOutside={()=>{
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

                            <DialogContent>
                                <View>
                                <TextInput
                                    placeholder="Temporary password will be sent to your email                            "
                                    underlineColorAndroid="transparent"
                                    onChangeText={text => this.setState({ email: text })}
                                    defaultValue={this.state.email}
                                    keyboardType='email-address'
                                    numberOfLines={2}
                                    style={{
                                        color: 'navy',
                                        fontSize:13
                                    }}
                                />
                                <Button
                                    title="Reset Password"
                                    onPress={async () => {
                                        await user.forgetPass(this.state.email.toLowerCase());
                                        this.setState({email : ''});
                                    }}
                                    key="button-1"
                                />
                                </View>
                            </DialogContent>

                        </Dialog>
                    
                </View>
            </ImageBackground>
        );
    }
}
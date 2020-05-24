import React from 'react';
import { Text, ImageBackground, Dimensions, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles.js';
import user from '../functions/user';
export default class login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            width: '',
            height: ''
        };
    }

    UNSAFE_componentWillMount() {
        this.setState({ width: Dimensions.get('window').width });
        this.setState({ height: Dimensions.get('window').height });
    }

    loginUser = async () => {

        if (await user.signupValidation(this.state.email, this.state.password, "default")) {
            const res = await user.login(this.state.email, this.state.password);
            console.log(res);
            if (res !== false) {
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

                    <View style={styles.submitButton}>

                        <TouchableOpacity onPress={() => this.loginUser()}>
                            <Text style={styles.text}>>>Login </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}
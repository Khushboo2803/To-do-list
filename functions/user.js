// This will handle user related functions
// function to implement signup user
import axios from 'axios';
import { Alert, Share, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

exports.signupValidation = async (email, password, username = null) => {
    const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
    if (expression.test(email) === false) {
        ToastAndroid.show("Invalid email", ToastAndroid.LONG);
        return false;
    }
    else if (password == '') {
        ToastAndroid.show("Password cannot be blank", ToastAndroid.LONG);
        return false;
    }
    else if (username == null || username == '') {
        ToastAndroid.show("Username cannot be blank", ToastAndroid.LONG);
        return false;
    }
    else if (password.length < 8) {
        ToastAndroid.show("minimum length of password is 8", ToastAndroid.LONG);
        return false;
    }
    else if (!passwordExpression.test(password)) {
        ToastAndroid.show("Password must contain 1 alphabet, 1 digit and 1 special character", ToastAndroid.LONG)
        return false;
    }


    return true;
}

//function to register user 
exports.register = async (email, user, password) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://stackhack.herokuapp.com/register',
            data: {
                "register": {
                    "email": email,
                    "name": user,
                    "password": password
                }
            }
        });
        console.log(response.data);
        //console.log(response.data.data.id);
        if (response.data.response == false) {
            if (response.data.message)
                ToastAndroid.show(response.data.message, ToastAndroid.LONG);
            if (response.data.msg)
                ToastAndroid.show(response.data.msg, ToastAndroid.LONG);
            return false;
        }
        else
            return response.data.data.id;
    }
    catch (error) {
        console.log(error)
        ToastAndroid.show(error.message, ToastAndroid.LONG);
        return false;
    }
}

//function to verify otp
exports.verifyOTP = async (id, otp) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://stackhack.herokuapp.com/verify',
            data: {
                "verify": {
                    "id": id,
                    "otp": otp
                }
            }
        });
        if (response.data.response == false) {
            if (response.data.msg)
                ToastAndroid.show(response.data.msg, ToastAndroid.LONG);
            if (response.data.message)
                ToastAndroid.show(response.data.message, ToastAndroid.LONG);
            return false;
        }
        else {
            ToastAndroid.show(response.data.message, ToastAndroid.LONG);
            console.log("sid is ", response.data.data._sid);
            return response.data.data._sid;
        }
    } catch (error) {
        console.log(error)
        ToastAndroid.show(error.message, ToastAndroid.LONG);
        return false;
    }
}

exports.resendOTP = async (id) => {
    try {
        console.log(id);
        const response = await axios({
            method: 'post',
            url: 'https://stackhack.herokuapp.com/resend',
            data: {
                "id": id
            }
        });
        if (response.data.message)
            ToastAndroid.show(response.data.message, ToastAndroid.LONG);
        if (response.data.msg)
            ToastAndroid.show(response.data.msg, ToastAndroid.LONG);
        else
            ToastAndroid.show("internal error", ToastAndroid.LONG);
    } catch (error) {
        console.log(error);
        ToastAndroid.show(error.message, ToastAndroid.LONG);
    }

}

exports.login = async (email, password) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://stackhack.herokuapp.com/login',
            data: {
                user: {
                    "email": email,
                    "password": password
                }
            }
        });
        if (response.data.response) {
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            return response.data.data;
        }
        else {
            if (response.data.msg)
                ToastAndroid.show(response.data.msg, ToastAndroid.LONG)
            if (response.data.message)
                ToastAndroid.show(response.data.message, ToastAndroid.LONG)
            return false;
        }
    } catch (error) {
        console.log(error);
        ToastAndroid.show(error.message, ToastAndroid.LONG);
        return false;
    }

}

// forget password
exports.forgetPass = async (email) => {
    try {
        console.log("got mail ", email);
        const response = await axios({
            method: 'post',
            url: 'https://stackhack.herokuapp.com/password/forgot',
            data: {
                "forgot": {
                    "email": email
                }
            }
        });
        console.log(response.data);
        if (response.data.response) {
            ToastAndroid.show("Temporary password sent to your mail", ToastAndroid.LONG);
        }
        else {
            ToastAndroid.show("Email not registered. Please Sign-Up first", ToastAndroid.LONG);
        }
    } catch (error) {
        console.log(error)
        ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
}

exports.updatePassword = async (oldpass, newpass) => {
    try {
        const id = await AsyncStorage.getItem('id');
        console.log('got id as ', id);
        const response = await axios({
            method: 'post',
            url: 'https://stackhack.herokuapp.com/password/update',
            data: {
                "update": {
                    "id": id,
                    "currentPassword": oldpass,
                    "newPassword": newpass
                }
            }
        });
        return response.data.response;
    } catch (error) {
        console.log(error);
        ToastAndroid.show(error.message, ToastAndroid.LONG);
    }

}

exports.shareMessage = async () => {
    try {
        console.log("inside sare");
        const msg = "StackHack 1.0 " + '\n' + "In this unorganized world, stay organized !" + '\n' + "Download To-Do App created by \*Khushboo Grover\* and \*Rohit Nayak\* " + '\n' + '\n' + "https://cutt.ly/stackvapp" + '\n' + '\n' + "Stay Organized!";
        Share.share({ message: msg.toString() })
            .then(result => console.log(result));
    } catch (error) {
        console.log(error);
        ToastAndroid.show(error.message, ToastAndroid.LONG);
    }

}

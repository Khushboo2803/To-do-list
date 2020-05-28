// This will handle user related functions
// function to implement signup user
import axios from 'axios';
import { Alert, Share } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

exports.signupValidation = async (email, password, username = null) => {
    const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (expression.test(email) === false) {
        alert("invalid email");
        return false;
    }
    else if (password == '') {
        alert("password cannot be blank");
        return false;
    }
    else if (username == null || username == '') {
        alert("Username cannot be blank");
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
                alert(response.data.message);
            if (response.data.msg)
                alert(response.data.msg);
            return false;
        }
        else
            return response.data.data.id;
    }
    catch (error) {
        console.log(error.message);
    }
}

//function to verify otp
exports.verifyOTP = async (id, otp) => {
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
    if (response.data.msg == "invalid otp") {
        Alert.alert("invalid otp");
        return false;
    }
    else if (response.data.message == "successfully verified") {
        console.log("sid is ", response.data.data._sid);
        return response.data.data._sid;
    }
    else {
        Alert.alert("Internal error");
        return false;
    }

}

exports.resendOTP = async (id) => {
    console.log(id);
    const response = await axios({
        method: 'post',
        url: 'https://stackhack.herokuapp.com/resend',
        data: {
            "id": id
        }
    });
    console.log(response.data);
}

exports.login = async (email, password) => {
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
    if (response.data.response)
        return response.data.data;
    else {
        if (response.data.msg)
            alert(response.data.msg);
        if (response.data.message)
            alert(response.data.message);
        return false;
    }
}

// forget password
exports.forgetPass = async (email) => {
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
        Alert.alert("Temporary password sent to your mail");
    }
    else {
        Alert.alert("Email not registered. Please Sign-Up first");
    }
}

exports.updatePassword = async (oldpass, newpass) => {
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
}

exports.shareMessage = async () => {
    console.log("inside sare");
    const msg = "StackHack 1.0 " + '\n' + "In this unorganized world, stay organized !" + '\n' + "Download To-Do App created by \*Khushboo Grover\* and \*Rohit Nayak\* " + '\n' + '\n' + "https://cutt.ly/stackvapp" + '\n' + '\n' + "Stay Organized!";
    Share.share({ message: msg.toString() })
        .then(result => console.log(result))
        .catch(error => console.log(error));
}

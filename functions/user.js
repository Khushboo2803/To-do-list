// This will handle user related functions
// function to implement signup user
import axios from 'axios';
import { Alert } from 'react-native';


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
        console.log(response);
        //console.log(response.data.data.id);
        if (response.data.response == false) {
            Alert.alert("User already exist. Please login");
            return;
        }
        if (response.data.message == "sucessfully registerd") {
            return response.data.data.id;
        }
        else {
            return false;
        }
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

// This will handle user related functions
// function to implement signup user
import axios from 'axios';

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
        if (response.data.response == true) {
            return response.data.data.id;
        }
        else {
            if (response.data.msg)
                alert(response.data.msg)
            if (response.data.message)
                alert(response.data.message);
            return undefined;
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

//function to verify otp
exports.verifyOTP = async (id, otp) => {
    console.log(id, otp)
    const resp = await axios.post('https://stackhack.herokuapp.com/verify', {
        "verify": {
            "id": id,
            "otp": otp
        }
    });
    console.log(resp);
    return false;
    // const response = await axios({
    //     method: 'post',
    //     url: 'https://stackhack.herokuapp.com/verify',
    //     data: {

    //     }
    // });
    // console.log(response.data);
    // if (response.data.response) {
    //     return response.data.data._sid;
    // }
    // else {
    //     return false;
    // }

}
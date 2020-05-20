import React from 'react';
import { Alert } from 'react-native';

class fun extends React.Component {
    constructor(props) {
        super(props)
    }
    signupValidation = async (email, password, username = 0) => {
        const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (expression.test(email) === false) {
            Alert.alert("invalid email");
        }
        else if (password == '') {
            Alert.alert("password cannot be blank");
        }
        else if (username == null || username == '') {
            Alert.alert("Username cannot be blank");
        }
        else {
            return true;
        }

        return false;
    }

    verifyOTP(email, otp) {

    }

}
const classObj = new fun();
export default classObj;
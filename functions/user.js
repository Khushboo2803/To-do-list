// This will handle user related functions
// function to implement signup user
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

//function to verify otp
exports.verifyOTP = (email, otp) => {

}
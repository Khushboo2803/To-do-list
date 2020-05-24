const reply = require('../response');
const code = require('../response/codes');
const userModel = require('../models/users');
const otpgenerator = require('otp-generator');
const sendEmail = require('./sendEmail');
const md5 = require('md5');
exports.login = async (req) => {
    const { user } = await req.body;
    user.password = md5(user.password);
    const isUser = await userModel.findOne(user);
    if (isUser) {
        if (!isUser.isVerified)
            throw new reply.errorResponse(code.CODE004, 'user not verified', null);
        else {
            return new reply.successResponse(code.CODE007, 'successfully logged in ', { _sid: isUser._id });
        }
    }
    else
        throw new reply.errorResponse(code.CODE006, 'no such user ', null)
}

exports.forgotPassword = async (req) => {
    const email = await req.body.forgot.email;
    const user = await userModel.findOne({ email });
    if (user) {
        if (user.isVerified == false)
            throw new reply.errorResponse(code.CODE004, 'User not verified, Please verify your account first', null)
        let tempPassword = otpgenerator.generate(8, {
            digits: true,
            alphabets: true,
            specialChars: false,
            upperCase: true
        });
        console.log(tempPassword)
        const sendTempPass = await sendEmail.sendPassword(email, tempPassword);
        //const sendMailtoUser = true;
        if (sendTempPass.response) {
            tempPassword = md5(tempPassword);
            const response = await userModel.updateOne({ email }, { $set: { password: tempPassword } });
            if (response.nModified > 0)
                return new reply.successResponse(code.CODE003, 'password sent to email successfully', null)
            else
                throw new reply.errorResponse(code.CODE002, 'failed to reset password', null);
        }
        else
            sendTempPass;
    }
    else
        throw new reply.errorResponse(code.CODE006, 'no such user ', null)

}

exports.updatePassword = async (req) => {
    const { update } = await req.body;
    const user = await userModel.findById(update.id);
    if (user) {
        const pass = md5(update.currentPassword);
        if (user.password !== pass)
            throw new reply.errorResponse(code.CODE006, "Entered Password does't match current password", null)
        const updatePass = md5(update.newPassword);
        const response = await userModel.updateOne({ _id: update.id }, { $set: { password: updatePass } });
        if (response.nModified > 0)
            return new reply.successResponse(code.CODE003, 'password updated successfully', null)
        else
            throw new reply.errorResponse(code.CODE002, 'failed to update password', null);
    }
    else
        throw new reply.errorResponse(code.CODE006, 'no such user ', null)
}
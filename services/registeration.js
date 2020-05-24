const reply = require('../response');
const code = require('../response/codes');
const otpgenerator = require('otp-generator');
const sendEmail = require('./sendEmail');
const userModel = require('../models/users');
const md5 = require('md5');
exports.register = async (req) => {
    const { register } = await req.body;
    const doExist = await userModel.findOne({ email: register.email });
    if (doExist) {
        if (doExist.isVerified)
            return new reply.errorResponse(code.CODE005, 'user already exist', null);
        else
            await userModel.deleteOne({ email: register.email });
    }
    register.password = md5(register.password);
    const otp = otpgenerator.generate(6, {
        digits: true,
        alphabets: false,
        specialChars: false,
        upperCase: false
    });
    const sendMailtoUser = await sendEmail.sendOtp(register.email, otp);
    //const sendMailtoUser = true;
    if (sendMailtoUser.response) {
        register.otp = otp;
        const doc = new userModel(register);
        const response = await doc.save();
        if (response)
            return new reply.successResponse(code.CODE000, 'sucessfully registerd', { id: response._id })
        else
            throw new reply.errorResponse(code.CODE003, 'failed to save in db', null);
    }
    else
        return sendMailtoUser;
}
exports.resend = async (req) => {
    const id = await req.body.id;
    console.log(id);

    const user = await userModel.findById(id);
    if (user) {
        if (user.isVerified)
            throw new reply.errorResponse(code.CODE005, 'User already verified', null);
        const otp = otpgenerator.generate(6, {
            digits: true,
            alphabets: false,
            specialChars: false,
            upperCase: false
        });
        const sendMailtoUser = await sendEmail.sendOtp(user.email, otp);
        if (sendMailtoUser.response) {
            const response = await userModel.updateOne({ email: user.email }, { $set: { otp: otp } });
            if (response)
                return new reply.successResponse(code.CODE003, 'otp resend successfully', null)
            else
                throw new reply.errorResponse(code.CODE002, 'failed to resend otp', null);
        }
        else
            return sendMailtoUser;
    }
    else
        throw new reply.errorResponse(code.CODE002, 'no such user exist', null);

}
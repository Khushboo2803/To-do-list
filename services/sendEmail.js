const nodemailer = require('nodemailer');
const reply = require('../response');
const code = require('../response/codes');
exports.sendOtp = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        pool: true,
        secure: true,
        host: process.env.MAILHOST,
        port: process.env.SMTPPORT,
        auth: {
            user: process.env.AUTHEMAIL,
            pass: process.env.AUTHPASS
        }
    });

    return transporter.sendMail({
        from: `"${process.env.EMAILNAME}" <${process.env.MAILSENDER}>`,
        to: email,
        subject: `OTP for To-Do-List App`,
        html: ` <p> OTP for verification is ${otp} , valid for next 15 minutes </p>`
    }).then(data => {
        //console.log(data);
        if (data.messageId)
            return new reply.successResponse(code.CODE001, 'OTP sent , Please verify your account', null)
        else
            throw new reply.errorResponse(code.CODE002, 'Unable to send mail, please check email again', null)
    }).catch(err => {
        console.log(err);
        throw new reply.errorResponse(code.CODE002, 'Unable to send mail, please check email again', null)
    })
}
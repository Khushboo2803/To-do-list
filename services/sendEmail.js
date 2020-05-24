const nodemailer = require('nodemailer');
const reply = require('../response');
const code = require('../response/codes');
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
exports.sendOtp = async (email, otp) => {
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

exports.sendPassword = async (email, password) => {
    return transporter.sendMail({
        from: `"${process.env.EMAILNAME}" <${process.env.MAILSENDER}>`,
        to: email,
        subject: `Temporary Password for To-Do-List App`,
        html: ` <p> Temporary Password  for login to your accoint is ${password}.
                <br> Please change the passowrd on next login </p>`
    }).then(data => {
        //console.log(data);
        if (data.messageId)
            return new reply.successResponse(code.CODE001, 'Check your email for temporary password', null)
        else
            throw new reply.errorResponse(code.CODE002, 'Unable to send mail, please check email again', null)
    }).catch(err => {
        console.log(err);
        throw new reply.errorResponse(code.CODE002, 'Unable to send mail, please check email again', null)
    })
}
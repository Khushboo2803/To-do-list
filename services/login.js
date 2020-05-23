const reply = require('../response');
const code = require('../response/codes');
const userModel = require('../models/users');
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
const reply = require('../response');
const code = require('../response/codes');
const userModel = require('../models/users');
exports.verify = async (req) => {
    const { verify } = req.body;
    console.log(verify)
    const user = await userModel.findById(verify.id);
    console.log(user)
    if (user) {
        if (user.isVerified)
            return new reply.errorResponse(code.CODE005, 'user already verified', null)
        else {
            if (user.otp == verify.otp) {
                const response = await userModel.updateOne({ _id: verify.id }, { $set: { isVerified: true }, $unset: { otp: verify.otp } })
                if (response)
                    return new reply.successResponse(code.CODE006, 'successfully verified', null);
                else
                    return new reply.errorResponse(code.CODE005, 'failed to verify', null)
            }
            else
                return new reply.errorResponse(code.CODE005, 'invalid otp', null)
        }
    }
    else
        return new reply.errorResponse(code.CODE005, 'invalid user id', null)
}
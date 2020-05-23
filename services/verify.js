const reply = require('../response');
const code = require('../response/codes');
const userModel = require('../models/users');
exports.verify = async (req) => {
    const { verify } = req.body;
    //console.log(verify)
    const user = await userModel.findById(verify.id);
    //console.log(user)
    if (user) {
        if (user.isVerified)
            throw new reply.errorResponse(code.CODE004, 'user already verified', null)
        else {
            if (user.otp == verify.otp) {
                const response = await userModel.updateOne({ _id: verify.id },
                    {
                        $set: { isVerified: true },
                        $unset: { otp: verify.otp }
                    });
                if (response)
                    return new reply.successResponse(code.CODE003, 'successfully verified', { _sid: user._id });
                else
                    throw new reply.errorResponse(code.CODE002, 'failed to verify', null)
            }
            else
                throw new reply.errorResponse(code.CODE005, 'invalid otp', null)
        }
    }
    else
        throw new reply.errorResponse(code.CODE006, 'invalid user id', null)
}

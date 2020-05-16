const reply = require('../response');
const code = require('../response/codes');

exports.register = async (req) => {
    const { register } = await req.body;
    return new reply.successResponse(code.CODE001, 'signup success with details: ', register);
}
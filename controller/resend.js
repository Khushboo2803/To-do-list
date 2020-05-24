const reply = require('../response');
const resendService = require('../services/registeration');
const code = require('../response/codes')
exports.resend = async (req, res) => {
    try {
        const response = await resendService.resend(req);
        console.log(response)
        res.send(response);
    } catch (error) {
        console.log(error)
        if (error instanceof reply.errorResponse)
            res.send(error)
        else
            res.send(new reply.errorResponse(code.CODE004, error.message, null));
    }
}
exports.notfound = async (req, res) => {
    res.send(new reply.errorResponse(code.CODE004, 'invalid path', null));
}
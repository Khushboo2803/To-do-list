const reply = require('../response');
const resendService = require('../services/registeration');
const code = require('../response/codes')
exports.resend = async (req, res) => {
    try {
        const response = await resendService.resend(req);
        res.send(response);
    } catch (error) {
        if (error instanceof reply.errorResponse)
            res.status(error.status).send(error)
        else
            res.send(new reply.errorResponse(code.CODE004, error.message, null));
    }
}
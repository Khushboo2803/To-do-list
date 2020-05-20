const reply = require('../response');
const code = require('../response/codes');
const verifyService = require('../services/verify');

exports.verify = async (req, res) => {
    try {
        const response = await verifyService.verify(req)
        res.send(response);
    } catch (error) {
        if (error instanceof reply.errorResponse)
            res.status(error.status).send(error)
        else
            res.send(new reply.errorResponse(code.CODE004, error.message, null));
    }
}
exports.notfound = async (req, res) => {
    res.send(new reply.errorResponse(code.CODE004, 'invalid path', null));
}
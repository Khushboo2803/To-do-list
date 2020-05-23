const reply = require('../response');
const registerService = require('../services/registeration');
const code = require('../response/codes')
exports.register = async (req, res) => {
    try {
        const response = await registerService.register(req);
        res.send(response);
    } catch (error) {
        if (error instanceof reply.errorResponse)
            res.send(error)
        else
            res.send(new reply.errorResponse(code.CODE004, error.message, null));
    }
}
exports.notfound = async (req, res) => {
    res.send(new reply.errorResponse(code.CODE004, 'invalid path', null));
}
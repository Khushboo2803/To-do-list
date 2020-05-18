const reply = require('../response');
const loginService = require('../services/login');
const code = require('../response/codes')
exports.login = async (req, res) => {
    try {
        const response = await loginService.login(req);
        res.send(response);
    } catch (error) {
        if (error instanceof reply.errorResponse)
            res.status(error.status).send(error)
        else
            res.send(new reply.errorResponse(code.CODE004, error.message, null));
    }
}
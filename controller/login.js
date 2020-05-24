const reply = require('../response');
const loginService = require('../services/login');
const code = require('../response/codes')
exports.login = async (req, res) => {
    try {
        const response = await loginService.login(req);
        res.send(response);
    } catch (error) {
        if (error instanceof reply.errorResponse)
            res.send(error)
        else
            res.send(new reply.errorResponse(code.CODE004, error.message, null));
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const response = await loginService.forgotPassword(req);
        res.send(response);
    } catch (error) {
        if (error instanceof reply.errorResponse)
            res.send(error)
        else
            res.send(new reply.errorResponse(code.CODE004, error.message, null));
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const response = await loginService.updatePassword(req);
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
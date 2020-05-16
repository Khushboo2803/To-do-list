const reply = require('../response');
const registerService = require('../services/registeration');
exports.register = async (req, res) => {
    try {
        const response = await registerService.register(req);
        res.send(response);
    } catch (error) {
        if (error instanceof reply.errorResponse)
            res.status(error.status).send(error)
        else
            res.sendStatus(500).send(new reply.errorResponse(undefined, error.message, null));
    }
}
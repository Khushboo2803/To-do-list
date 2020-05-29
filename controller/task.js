const reply = require('../response');
const taskService = require('../services/task');
const code = require('../response/codes')
exports.getAllTask = async (req, res) => {
    try {
        console.log('trying')
        const response = await taskService.allTask(req);
        res.send(response);
    } catch (error) {
        if (error instanceof reply.errorResponse)
            res.status(error.status).send(error)
        else
            res.send(new reply.errorResponse(code.CODE004, error.message, null));
    }
}

exports.getCompletedTask = async (req, res) => {
    try {
        const response = await taskService.getCompletedTask(req);
        res.send(response);
    } catch (error) {
        if (error instanceof reply.errorResponse)
            res.status(error.status).send(error)
        else
            res.send(new reply.errorResponse(code.CODE004, error.message, null));
    }
}

exports.getCurrentTask = async (req, res) => {
    try {
        const response = await taskService.getCurrentTask(req);
        res.send(response);
    } catch (error) {
        if (error instanceof reply.errorResponse)
            res.send(error)
        else
            res.send(new reply.errorResponse(code.CODE004, error.message, null));
    }
}

exports.addTask = async (req, res) => {
    try {
        const response = await taskService.addTask(req);
        res.send(response);
    } catch (error) {
        if (error instanceof reply.errorResponse)
            res.send(error)
        else
            res.send(new reply.errorResponse(code.CODE004, error.message, null));
    }
}

exports.updateTask = async (req, res) => {
    try {
        const response = await taskService.updateTask(req);
        res.send(response);
    } catch (error) {
        if (error instanceof reply.errorResponse)
            res.send(error)
        else
            res.send(new reply.errorResponse(code.CODE004, error.message, null));
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const response = await taskService.deleteTask(req);
        res.send(response);
    } catch (error) {
        if (error instanceof reply.errorResponse)
            res.send(error)
        else
            res.send(new reply.errorResponse(code.CODE004, error.message, null));
    }
}

exports.search = async (req, res) => {
    try {
        const response = await taskService.search(req);
        res.send(response);
    } catch (error) {
        if (error instanceof reply.errorResponse)
            res.send(error)
        else
            res.send(new reply.errorResponse(code.CODE004, error.message, null));
    }
}

exports.notfound = async (req, res) => {
    res.send(new reply.errorResponse(code.CODE004, 'invalid route', null));
}
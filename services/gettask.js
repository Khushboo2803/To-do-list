const reply = require('../response');
const code = require('../response/codes');
const taskModel = require('../models/task');
exports.login = async (req) => {
    const author = await req.body._sid;
    const tasks = await taskModel.find({ author })
    if (tasks.length)
        return new reply.successResponse(code.CODE004, 'task fetched successfully ', { taskItems: tasks });

    else
        throw new reply.errorResponse(code.CODE001, 'no tasks to dispay', null)
}
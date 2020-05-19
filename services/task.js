const reply = require('../response');
const code = require('../response/codes');
const taskModel = require('../models/task');
exports.allTask = async (req) => {
	const author = await req.params.author;
	const tasks = await taskModel.find({ author })
	if (tasks.length)
		return new reply.successResponse(code.CODE004, 'task fetched successfully ', { taskItems: tasks });

	else
		throw new reply.errorResponse(code.CODE001, 'no tasks to dispay', null)
}

exports.getCompletedTask = async (req) => {
	const author = await req.params.author;
	const completedTasks = await taskModel.find({ author, taskStatus: 'completed' });
	if (completedTasks.length)
		return new reply.successResponse(code.CODE004, 'completed task fetched successfully ', { taskItems: completedTasks });

	else
		throw new reply.errorResponse(code.CODE001, 'no tasks completed', null)
}

exports.getCurrentTask = async (req) => {
	const author = await req.params.author;
	const taskList = await taskModel.find({
		$and: [
			{ author },
			{ $or: [{ taskStatus: 'new' }, { taskStatus: 'ongoing' }] }
		]
	});

	if (taskList.length)
		return new reply.successResponse(code.CODE004, 'tasks fetched successfully ', { taskItems: taskList });

	else
		throw new reply.errorResponse(code.CODE001, 'no tasks for now', null)
}

exports.addTask = async (req) => {
	const { task } = await req.body;
	task.author = await req.params.author;
	const obj = new taskModel(task);
	const respone = await obj.save();
	if (respone) {
		return new reply.successResponse(code.CODE004, 'tasks added successfully ', { taskItems: taskList });
	}
	else
		throw new reply.errorResponse(code.CODE001, 'no tasks for now', null)
}

exports.updateTask = async (req) => {
	const { taskId, author } = await req.params;
	const { update } = await req.body;
	const task = await taskModel.updateOne({ _id: taskId }, { $set: update });
	if (task.nModified)
		return new reply.successResponse(code.CODE004, 'tasks updated successfully ', { taskItems: task });
	else
		throw new reply.errorResponse(code.CODE001, 'failed to update task', null)
}

exports.deleteTask = async (req) => {
	const { taskId, author } = await req.params;
	const respone = await taskModel.deleteOne({ _id: taskId, author });
	console.log(respone);
	return new reply.successResponse(code.CODE004, 'deleted successfully', response);
}
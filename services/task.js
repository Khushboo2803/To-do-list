const reply = require('../response');
const code = require('../response/codes');
const taskModel = require('../models/task');
exports.allTask = async (req) => {
	const author = await req.params.author;
	const tasks = await taskModel.find({ author })
	if (tasks) {
		return new reply.successResponse(code.CODE007, 'task fetched successfully ', { taskItems: tasks });
	}

	else {
		console.log('throw error')
		throw new reply.errorResponse(code.CODE004, 'invalid authour request', null)
	}
}

exports.getCompletedTask = async (req) => {
	const author = await req.params.author;
	const completedTasks = await taskModel.find({ author, taskStatus: 'completed' });
	if (completedTasks)
		return new reply.successResponse(code.CODE007, 'completed task fetched successfully ', { taskItems: completedTasks });

	else
		throw new reply.errorResponse(code.CODE002, 'no tasks completed', null)
}

exports.getCurrentTask = async (req) => {
	const author = await req.params.author;
	const taskList = await taskModel.find({
		$and: [
			{ author },
			{ $or: [{ taskStatus: 'new' }, { taskStatus: 'ongoing' }] }
		]
	});

	if (taskList)
		return new reply.successResponse(code.CODE007, 'tasks fetched successfully ', { taskItems: taskList });

	else
		throw new reply.errorResponse(code.CODE007, 'no tasks for now', null)
}

exports.addTask = async (req) => {
	const { task } = await req.body;
	task.author = await req.params.author;
	const obj = new taskModel(task);
	const respone = await obj.save();
	if (respone) {
		return new reply.successResponse(code.CODE000, 'tasks added successfully ', { taskItems: respone });
	}
	else
		throw new reply.errorResponse(code.CODE002, 'fail to save task', null)
}

exports.updateTask = async (req) => {
	const { taskId } = await req.params;
	const { update } = await req.body;
	const task = await taskModel.updateOne({ _id: taskId }, { $set: update });
	if (task.nModified)
		return new reply.successResponse(code.CODE003, 'tasks updated successfully ', null);
	else
		throw new reply.errorResponse(code.CODE002, 'failed to update task', null)
}

exports.deleteTask = async (req) => {
	const { taskId, author } = await req.params;
	const response = await taskModel.deleteOne({ _id: taskId, author });
	//console.log(response);
	if (response.deletedCount)
		return new reply.successResponse(code.CODE007, 'deleted successfully', null);
	else
		throw new reply.errorResponse(code.CODE002, 'No such task', null)
}
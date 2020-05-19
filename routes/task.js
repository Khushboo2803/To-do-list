const express = require('express');
const router = express.Router();

const taskController = require('../controller/task');

router.use('/:author/update/:taskId', taskController.updateTask);
router.use('/:author/delete/:taskId', taskController.deleteTask);
router.use('/:author/completed', taskController.getCompletedTask);
router.use('/:author/tasks', taskController.getCurrentTask);
router.use('/:author/addtask', taskController.addTask);
router.use('/:author', taskController.getAllTask);
router.use('*', taskController.notfound)
//router.use('*', taskController.notfound);

module.exports = router;
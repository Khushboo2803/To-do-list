const express = require('express');
const router = express.Router();

const taskController = require('../controller/task');

router.post('/:author/update/:taskId', taskController.updateTask);
router.post('/:author/delete/:taskId', taskController.deleteTask);
router.post('/:author/completed', taskController.getCompletedTask);
router.post('/:author/tasks', taskController.getCurrentTask);
router.post('/:author/addtask', taskController.addTask);
router.post('/:author/search', taskController.search);
router.post('/:author', taskController.getAllTask);
router.use('*', taskController.notfound)
//router.use('*', taskController.notfound);

module.exports = router;
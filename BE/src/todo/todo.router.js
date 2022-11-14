const express = require('express');
const {getTasks, addTasks, deleteTask, editTask, showAll} = require('./todo.controller');
const router = express.Router();


router.route('/add').post(addTasks);
router.route('/tasks').get(showAll);
router.route('/:taskId').get(getTasks).put(editTask).delete(deleteTask);

module.exports = router;
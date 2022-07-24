const express = require('express')
const router = express.Router();

const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask 
} = require('../controllers/tasks') 

// routes for /controllers/tasks
router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

// why is router not imported using require('router') in the app.js is it because the whole file ./routes/tasks is imported using require('./routes/tasks') giving app.js access to it?
module.exports = router
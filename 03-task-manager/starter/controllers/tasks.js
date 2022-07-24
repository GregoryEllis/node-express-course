// Here  mongoose.model('Task', TaskSchema) is import from (../model/Task) and is store in Task
const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({})
    // response options when setting up them up
    // res.status(200).json( { tasks,amount:tasks.length} )
    // When using this approach I would have to add to the error arguments rather its a 404 err or a 500 error. 
    // res
    //     .status(200)
    //     .json( { success:true,data:{tasks, nbHits: tasks.length } } ) 
    res.status(200).json( { tasks } )    
})

// What is the difference between res.json and res.send? I know that .json allows for a object to be sent to the server. But what else?
const createTask = asyncWrapper(async (req, res) => { 
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => { 
    const {id:taskID} = req.params
    const task = await Task.findOne({_id:taskID})
    if(!task) {
        // Always make sure to use return
        // this error msg is from a snytax error and is handle by me.
        return next(createCustomError(`No task with id : ${taskID}`,404))
    }    
    res.status(200).json({task})
})

const deleteTask = asyncWrapper(async (req, res) => {
    const {id:taskID} = req.params;
    const task = await Task.findOneAndDelete({_id:taskID});
    if(!task) { 
        return next(createCustomError(`No task with id : ${taskID}`,404))
    } 
    res.status(200).json({task})
    // May also see the following
    // res.status(200).send()
    // res.status(200).json({ task: mull, status: 'success' }) 
    res.send('delete task')
})

const updateTask = asyncWrapper( async (req, res) => {
    const {id:taskID} = req.params;
    // We need the second argument b/c if I am updated something I need tha new info. 
    const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
        new:true, // will always return the new item. The one that is already updated.
        runValidators:true,
    })
    
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`,404))
    }
    res.status(200).json({task})    
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask 
}    
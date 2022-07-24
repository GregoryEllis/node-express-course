// Here  mongoose.model('Task', TaskSchema) is import from (../model/Task) and is store in Task
const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        // response options when setting up them up
        // res.status(200).json( { tasks } )
        // res.status(200).json( { tasks,amount:tasks.length} )
        // When using this approach I would have to add to the error arguments rather its a 404 err or a 500 error. 
        res
            .status(200)
            .json( { success:true,data:{tasks, nbHits: tasks.length } } )
    }   catch (error) {
        res.status(500).json({ msg: error})
    }
}

// What is the difference between res.json and res.send? I know that .json allows for a object to be sent to the server. But what else?
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
        
    } catch (error) {
        res.status(500).json({ msg: error})
    }
}
const getTask = async (req, res) => {
    try { 
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID});
        if(!task) {
            // Always make sure to use return
            // Have two ways to respond to an error is a commom setup
            // this error msg is from a snytax error and is handle by me
            return res.status(404).json({msg:`No task with id : ${taskID}`})
        }    
        res.status(200).json({task})
    } catch (error) {
        //  this error msg is handle by mongoose.   
        res.status(500).json({ msg: error})
        
    }   
}
const deleteTask = async (req, res) => {
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task) { 
            return res.status(404).json({msg:`No task with id : ${taskID}`})
        } 
        res.status(200).json({task})
        // May also see the following
        // res.status(200).send()
        // res.status(200).json({ task: mull, status: 'success' }) 
    } catch (error) {
        res.status(500).json({ msg: error})  
    }
    res.send('delete task')
}
const updateTask = async (req, res) => {
    try {
        const {id:taskID} = req.params;
// We need the second argument b/c if I am updated something I need tha new info. 
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true, // will always return the new item. The one that is already updated.
            runValidators:true,
        })

if (!task) {
    return res.status(404).json({msg:`No task with id : ${taskID}`})
}
    res.status(200).json({task})
    } catch (error) {
    res.status(500).json({ msg: error})  
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask 
}    
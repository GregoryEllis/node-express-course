const mongoose  = require('mongoose');

// The only thing that will be passed to the data base is whatever is in your Schema everything else will be ignored. This will allow you to setup a structure.
const TaskSchema = new mongoose.Schema({
    // validator
    name: {
        type:String,
        // If proper info is not true will send err msg
        required:[true, 'must provide name'],
        trim:true,
        maxlength:[20, 'name can not be more than 20 characters']
    },
    completed: {
        type:Boolean,
        default:false
    }       
})

// The struture from TaskSchema is saved inside 'Task' string and exported to be used in other module/files
module.exports = mongoose.model('Task', TaskSchema)
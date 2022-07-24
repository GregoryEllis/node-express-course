const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')


// middleware
// needed to access data in req.body
app.use(express.json())

app.use(express.static('./public'))

// routes

// use tasks in /api/v1/tasks
app.use('/api/v1/tasks',tasks)

// app.get('/api/v1/tasks')         - get all the tasks
// app.post('/api/v1/tasks')        - create a new task
// app.get('/api/v1/tasks/:id')     - get single task
// app.patch('/api/v1/tasks/:id')   - update task
// app.delete('/api/v1/tasks/:id')  - delete task

app.use(notFound)

const port = 3000

// b/c connectDB returns a promise I can set the to async then we can use the await keyword.
// whenever using async always use a try catch block that error can be handled.
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening on port ${port}...`) )

  } catch (error) {
    console.log(error);
  }
}

start()



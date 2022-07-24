const express = require('express')
const app = express()

const people = require('./routes/people')
const auth = require('./routes/auth')

// static assets
app.use(express.static('./myMethods-public'))

// pase form data
app.use(express.urlencoded({ extended: false }))

// parse json
app.use(express.json())

// here we app.use to setup all the routes that start with /api/people
app.use('/api/people', people)
app.use('/login', auth)

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})

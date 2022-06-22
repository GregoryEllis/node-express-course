const http = require('http')

const server = http.createServer((req, res) => {
  console.log('request event')
  res.end('Hello World')
})

// Here we are telling the Event Loop to keep listening for the incoming requests. And the moment they show up respond to them appropriately.
server.listen(5000, () => {
  console.log('Server listening on port : 5000....')
})

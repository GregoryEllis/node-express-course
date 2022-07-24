const http = require('http')

// const server = http.createServer((req, res) => {
//   res.end('Welcome')
// })

// Here's a different way to set up the server
// Using Event Emitter API
const server = http.createServer() // call back function that handles the incoming request.
// emits request event behind the seen
// subcribe to it / listen for it / respond to it
server.on('request', (req, res) => {
  res.end('Welcome')
})

server.listen(5000)
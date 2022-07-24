// This is built in node.js so you do not have to install it.
const http = require('http')

// This method takes a call back function which is going to be invoked everytime the user hits our server 
const server = http.createServer((req, res)=>{
    // console.log(req.method)
    // Outputs GET this is the method the user is using.
    console.log(req.url)
    // Outputs: the resource that the user is trying to access.
    // (/) is the home page. (/resource name) will give you the resource name. You can have (/resource name/resource name/ and on and on )


    // Here we are providing headers so we are providing meta data about our response.
    // The second argument is saying hey I'm send back html or css, or I'm sending back the image etc., so the browser knows what to do. How to render that content. 
    // Whatever we are sending back is called media or mime (Multipurpose Internet Mail Extensions) types.
    // We don't have to worry about setting up mime b/c EXPRESS takes care of that.
    // The first argument is the status code. We are in control of the status code.
    res.writeHead(200,{'content-type': 'text/html'})

    // You can pass the body in res.write() or pass the body in res.end, but remember if  
    res.write('<h1>Home Page</h1>')

    // There is a method that we always have to use to give a response.
    // This method signals to the server that all of the response headers and body have been sent; that server should consider this message complete. The method response.end(). MUST be called on each response.
    // We should always have res.end() b/c this signals that the communication is over.
    res.end();
})

server.listen(5000)



// Form example

const express = require('express')
const app = express()
let { people } = require('./myData')

// static assets
app.use(express.static('./myMethods-public'))
// pase form data
app.use(express.urlencoded({ extended: false }))

// Default method that the browser performs
app.get('/api/people',(req, res) => {
  res.status(200).json({success: true, data: people})
})

app.post('/login', (req, res) => {
  const {name} = req.body;
  if(name) {
    return res.status(200).send(`Welcome ${name}`)
  }
  res.status(401).send('Please provide credentials')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})

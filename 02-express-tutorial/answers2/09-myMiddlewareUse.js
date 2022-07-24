const express = require('express')
const app = express()
const logger = require('./myLogger.js')
const authorize = require('./myAuthorize.js')
// req => middleware => res

// Will allow me to pass in the middleware to all routes
// Will invoke logger in any route.
// Order matters in EXPRESS, app.use most at the top inorder for logger to be pass in as middleware.

// Applies to:
// api/home/about/products
// app.use(logger)

// Applies only to:
// api/products
// api/items
// app.use('/api',logger)

// This is how we can setup multiple middleware functions. We place them inside an array.
// Whatever order the middleware functions are in is the order they will be executed in.

app.use([logger, authorize])

app.get('/', (req,res)=>{
  res.send('Home')
})
app.get('/about', (req,res)=>{
  res.send('About')
})
app.get('/api/products', (req,res)=>{
  res.send('Products')
})
app.get('/api/items', (req,res)=>{
  console.log(req.user)
  res.send('Items')
})
app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})

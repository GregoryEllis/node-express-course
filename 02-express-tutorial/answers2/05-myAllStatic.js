const express = require('express');
const path = require('path');
const app = express();

// setup static and middleware
// A static file is a file that a server does not have to change. It has a common name of public.
// An ex. of a static file is a image file, css file, and a Js file.
// A Js file is static as far the server is concerned but it is not static when it comes to the browser. 
// So if I had 20,000 images I would dump them in this method and Express will take care of it all. It will setup the path, the mime, and the status code.
app.use(express.static('./myMethods-public'))

// This is also a static asset so we can add it to the static method.
// app.get('/',(req,res)=>{
//   res.sendFile(path.resolve(__dirname,'./myNavBar-app/my-index.html'))
//    adding to static assets
//    Server Side Rendering (SSR)
// })

app.all('*',(req,res)=>{
  res.status(404).send('resource not found')
})

app.listen(5000,()=>{
  console.log('server is listening on port 5000.... ')
})
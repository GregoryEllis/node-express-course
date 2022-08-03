// check username, password in post(login) request
// if exist create new JWT
// send back res to front-end

// setup authentication so only the request w/ JWT can access the dashboard

const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')


const login = async (req,res) => {
    // for the post request we want to access req.body    
    const { username,password} = req.body
    
    // before we issue the token which we eventally allow the front-end to access the route. I want to rather the username and password have been provided.
    // When working w/ a DB we have three options for checking validation. 
    // 1. mongo validation (we can use this once we introduce a DB)
    // 2. Joi (use when we are not connected to a DB)
    // 3. check in the controller
    
    if(!username || !password) {
        // Made possible by the Class constructor function in errors/custom-error.js
        throw new BadRequestError('Please provide email and password') 
    }
    // just for demo, normally provided by DB!!!
    const id = new Date().getDate() 
    
    // try to keep payload small, better experience for user
    // just for demo, in production use long, complex and unguessable string value!!!!!!!!!!!!
    const token = jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn:'30d'})
    
    res.status(200).json({msg:'user created',token})
}

const dashboard = async (req,res) => {
 // To get a random number between 0 and 100
 const luckyNumber = Math.floor(Math.random()*100)

 res
     .status(200)
     .json({
      msg:`Hello, ${req.user.username}`, // req had to be added b/c I did not destructure it.
      secret:`Here is your authorized data, your lucky number is ${luckyNumber}`,
     })  
}

module.exports = {
    login, dashboard
}
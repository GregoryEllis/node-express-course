const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authenticationMiddleware = async (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided') 
    }

const token = authHeader.split(' ')[1]
 
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded) // Outputs the entire payload

    // here we are destructuring decoded to only include id and username
    const {id,username} = decoded

    // this allows the data to be passed to the next middleware
    req.user = {id, username}
    next()
   
} catch (error) {
  throw new UnauthenticatedError('Not authorized to access this route') 

}
}

module.exports = authenticationMiddleware
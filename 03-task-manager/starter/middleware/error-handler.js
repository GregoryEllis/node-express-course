const {CustomAPIError} = require('../errors/custom-error')
const errorHandlerMiddleware = (err,req,res,next) => {
    
    // err.status and err.message are accessed from const error = new Error('Not Found') which is an Error constructor
   // return res.status(err.status).json({ msg: err.message })
   if(err instanceof CustomAPIError) {
       return res.status(err.statusCode).json({ msg: err.message })
   }
   // Syntax base error
   return res.status(500).json({ msg: 'Something went wrong please try again!' })
}

module.exports = errorHandlerMiddleware
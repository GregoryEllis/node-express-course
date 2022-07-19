// The argument of the asyncWrapper will be the one of the functions in the controllers/tasks.js file. The middleware function returns a promise, and handles the arguments req, res, next. This middleware function is being imported from middleware/async.js the give it a more cleaner look which in turn will limit potential bugs and and increase readalble its also consider a convention to setup the a middleware such as this in this fashion.

const asyncWrapper = (fn) => {
    return async (req,res,next) => {
        try {
            await fn(req,res,next)
        } catch (error) {
            // Here we are passing it to the next middleware
            next(error)
        }
    }
} 

module.exports = asyncWrapper
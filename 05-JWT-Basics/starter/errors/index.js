// Here we will import all three error types. Then we will export them as one big object.
// If I wanted to use of these I will have to look for that specific file.
// By setting up index.js I will be able to look just in the errors b/c by default the index.js will be served. And in there we will have all the errors.

const CustomAPIError = require('./custom-error')
const BadRequestError = require('./bad-request')
const UnauthenticatedError = require('./unauthenticated')


module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError,
}

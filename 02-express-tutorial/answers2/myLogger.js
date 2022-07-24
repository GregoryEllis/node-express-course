// Here behind the seen EXPRESS will pass in the req, res, and the next to app.get 
const logger = (req, res, next) => {
    const method = req.method; // accessing request object.
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);
  
    // When you are working w/ middleware you must pass it to a next middleware unless you are terminating the whole cycle by sending back a response.
    // res.send() is an example of terminating the whole cycle b/c you will send back your own data.
  
    next() // Pass to the next function which is app.get
  }

  module.exports = logger
const consoleLog = (req, res, next) => {
    
    console.log('Practice Middleware');
    
    next() // Pass to the next function which is app.get
}

module.exports = consoleLog
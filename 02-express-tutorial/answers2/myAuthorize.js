const authorize = (req, res, next) =>{
    const {user} = req.query;
    if(user === 'Greg'){
        req.user = {name:'Greg', id:7}
        next()
    } else {
        res.status(401).send('Unauthorized')
    }
    
}

module.exports = authorize
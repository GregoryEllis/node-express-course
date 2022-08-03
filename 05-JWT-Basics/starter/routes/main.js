const express = require('express')
const router = express.Router()

const { login, dashboard } = require('../controllers/main')

const authMiddleware = require('../middleware/auth')

// I can set up whatever amount of routes I want. And place authMiddleware w/in the route and I don't have to repeat the code for authMiddleware 
router.route('/dashboard').get(authMiddleware,dashboard)
// Will be a post b/c we want to get the user's cerdentials (username and password).
router.route('/login').post(login)

module.exports = router
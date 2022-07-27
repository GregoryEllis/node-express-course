const express = require('express')
const router = express.Router()

const {
    getAllProducts,
    getAllProductsStatic
} = require('../controllers/products')

// for main route /api/v1/products
router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)

module.exports = router







const express = require('express')
const router = express.Router()
const getProducts = require("../controllers/productController") /*import so that getProducts can be accessed*/

router.get("/", getProducts) /*the get request is now being handled in getProducts*/

module.exports = router
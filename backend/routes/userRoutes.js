

const express = require('express')
const router = express.Router()
const getUsers = require("../controllers/userController")

router.get("/", getUsers) /*the get request is now being handled in getProducts*/

module.exports = router
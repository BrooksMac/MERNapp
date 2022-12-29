

const express = require('express')
const router = express.Router()
const {getUsers, registerUser} = require("../controllers/userController")


router.post("/register", registerUser)

/*user logged in routes*/

/*admin routes*/
router.get("/", getUsers) /*the get request is now being handled in getUsers*/

module.exports = router


const express = require('express')
const router = express.Router()

/*here we will list all the different commands we can give our DB*/
const {getCategories, newCategory, deleteCategory, saveAttr} = require("../controllers/categoryController")

router.get("/", getCategories)
router.post("/", newCategory)
router.post("/attr", saveAttr)
/*here we use a dynamic endpoint so that the DB can receive from the form*/
router.delete("/:category", deleteCategory)


module.exports = router
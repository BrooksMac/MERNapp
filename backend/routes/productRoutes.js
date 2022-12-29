

const express = require('express')
const router = express.Router()
const {getProducts, getProductById, getBestSellers, adminGetProducts, adminDeleteProduct, adminCreateProduct, adminUpdateProduct, adminUpload, adminDeleteProductImage} = require("../controllers/productController") /*import so that getProducts can be accessed*/

/*user routes*/
router.get("/category/:categoryName/search/:searchQuery", getProducts) /*searching through a particular category*/
router.get("/category/:categoryName", getProducts) /*/:category is a dynamic URL passed parameter*/
router.get("/search/:searchQuery", getProducts) /*searching through ALL categories*/
router.get("/", getProducts) /*the get request is now being handled in getProducts*/
router.get("/get-one/:id", getProductById)
router.get("/bestsellers", getBestSellers)

/*admin routes*/
router.get("/admin", adminGetProducts)
router.delete("/admin/:id", adminDeleteProduct)
router.post("/admin", adminCreateProduct) /*post is for saving new items to the DB*/
router.put("/admin/:id", adminUpdateProduct) /*put is used for updating in the DB*/
router.post("/admin/upload", adminUpload)
router.delete("/admin/image/:imagePath/:productId", adminDeleteProductImage)

module.exports = router
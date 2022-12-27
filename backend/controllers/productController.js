/*Product is the definition of the structure of the item we would like to create, like an object*/
const Product = require("../models/ProductModel")

const getProducts = (req, res) => {
    res.send("Handling product routes, e.g. search for products")
}
module.exports = getProducts
/*Product is the definition of the structure of the item we would like to create, like an object*/
const Product = require("../models/ProductModel")
const recordsPerPage = require("../config/pagination")

const getProducts = async (req, res, next) => {
    try{

        /*filtering*/
        let query = {}
        let queryCondition = false

        let priceQueryCondition = {}
        if(req.query.price) {
            queryCondition = true
            priceQueryCondition = {price: { $lte: Number(req.query.price)}}
        }
        let ratingQueryCondition = {}
        if(req.query.rating) {
            queryCondition = true
            ratingQueryCondition = {rating: { $in: req.query.rating.split(",")}}
        }

        let categoryQueryCondition = {}
        const categoryName = req.params.categoryName || ""
        if(categoryName)
            queryCondition = true
        let a = categoryName.replaceAll(",","/")
        let regEx = new RegExp("^" + a)
        categoryQueryCondition = {category: regEx}

        if (queryCondition) {
            query = {
                $and: [priceQueryCondition, ratingQueryCondition, categoryQueryCondition]
            }
        }




        /*current pageNum*/
        const pageNum = Number(req.query.pageNum) || 1
        res.json({pageNum})

        /*sorting by*/
        let sort = {}
        const sortOption = req.query.sort || ""
        if(sortOption) {
            let sortOpt = sortOption.split("_")
            /*not an array, it is a dynamic value*/
            sort = {[sortOpt[0]]: Number(sortOpt[1])}


        }

        const totalProducts = await Product.countDocuments({query})

        const products = await Product.find({query})
            /*this will allow us to traverse to sequent pages and display the products of those pages*/
            .skip(recordsPerPage * (pageNum - 1))
            .sort(sort)
            .limit(recordsPerPage) /*add .limit() for pagination purposes the recordsPerPage variable can be found in config*/
        res.json({products, pageNum, paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage)}) /*pagination links number is the amount of page links we should display*/
    } catch (error) {
        next(error)
    }
}




module.exports = getProducts
/*Product is the definition of the structure of the item we would like to create, like an object*/
const Product = require("../models/ProductModel")
const recordsPerPage = require("../config/pagination")
const imageValidate = require("../utils/imageValidate")
const {v4: uuidv4} = require("uuid");
const path = require("path");

/*user*/

const getProducts = async (req, res, next) => {
    try{

        /*filtering*/
        let query = {}
        let queryCondition = false
        /*price*/
        let priceQueryCondition = {}
        if(req.query.price) {
            queryCondition = true
            priceQueryCondition = {price: { $lte: Number(req.query.price)}}
        }
        /*rating*/
        let ratingQueryCondition = {}
        if(req.query.rating) {
            queryCondition = true
            ratingQueryCondition = {rating: { $in: req.query.rating.split(",")}}
        }
        /*category*/
        let categoryQueryCondition = {}
        const categoryName = req.params.categoryName || ""     /*this is the URL passed dynamic variable*/
        if(categoryName)
            queryCondition = true
        let a = categoryName.replaceAll(",","/")
        let regEx = new RegExp("^" + a)
        categoryQueryCondition = {category: regEx}

        if(req.query.category){
            queryCondition = true
            let a = req.query.category.split(",").map((item) => {
                if(item) return new RegExp("^" + item)
            })
            categoryQueryCondition = {
                category: {$in: a}
            }
        }

        /*Filtering by attribute*/
        let attrsQueryCondition = []
        if(req.query.attrs) { /*possible value of attrs is     attrs=RAM-1TB-2TB, color-blue-red        first the key, then values seperated by dashes, then after the comma the next key and values begins*/
            /*                    now [ 'RAM-1TB-2TB-4TB', 'color-blue-red' ]   */
            attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
                if (item) {
                    let a = item.split("-")
                    let values = [...a] /*this becomes first pass:[ 'RAM', '1TB', '2TB', '4TB' ]    ,   second pass:  ['color', 'blue' ,'red' ]*/
                    values.shift() /*removes the first element in both arrays, the key*/
                    let singlePassAttrs= {
                        attrs: { $elemMatch: {key: a[0], value: {$in: values}}}
                    }
                    acc.push(singlePassAttrs)
                    return acc /*the .reduce function requires a return same as .map*/
                } else return acc
            }, []) /*this is the original value of the reduce-operator, in our case an empty array*/
            queryCondition = true
        }

        /*pagination*/
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

        /*searching using the searchbar*/
        const searchQuery = req.params.searchQuery || ""
        let searchQueryCondition = {}
        let select = {}
        if(searchQuery) {
            queryCondition = true
            searchQueryCondition = { $text: {search: searchQuery} } /*$text comes from the index we created in the productModel */
            select = {
                score: { $meta: "textScore"} /*this allows results to be sorted by their accuracy to the requested search*/
            }
            sort = {score: { meta: "textScore" }}
        }

        /*combining all the different queries*/
        if (queryCondition) {
            query = {
                $and: [priceQueryCondition, ratingQueryCondition, categoryQueryCondition, searchQueryCondition, ...attrsQueryCondition] /*... is used because attrsQueryCondition actually contains multiple different queries.*/
            }
        }


        /*Get the number of results from the query, the query being all the filters we put on the search*/
        const totalProducts = await Product.countDocuments({query})

        /*this is for displaying a portion of the totalProducts which represents a page of results.*/
        const products = await Product.find({query})
            .select(select)
            /*this will allow us to traverse to sequent pages and display the products of those pages*/
            .skip(recordsPerPage * (pageNum - 1))
            .sort(sort) /*allows for sorting by the accuracy of the requested result*/
            .limit(recordsPerPage) /*add .limit() for pagination purposes the recordsPerPage variable can be found in config*/
        res.json({products, pageNum, paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage)}) /*pagination links number is the amount of page links we should display*/
    } catch (error) {
        next(error)
    }
}

const getProductById = async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id).populate("reviews").orFail() /*populate(reviews) makes it so that all the fields of the review are shown not only the ID number*/
        res.json(product)
    } catch(error){
        next(error)
    }
}

const getBestSellers = async(req, res, next) => {
    try {
        const products = await Product.aggregate([ /*get all items that fall under the Products model*/
            { $sort: {category: 1, sales: -1}}, /*sort by category and then by descending sales*/
            { $group: {_id: "$category", doc_with_max_sales: {$first: "$$ROOT"}}}, /*group by category and take the first item of each*/
            { $replaceWith: "$doc_with_max_sales"}, /*display the actual item*/
            { $project: {_id: 1, name: 1, images: 1, category: 1, description: 1}}, /*select which properties of the item you want to display*/
            { $limit: 3} /*only 3 results and since we've already selected only the top item of each category 3 different items from 3 different categories*/
        ])
    } catch (error) {
        next(error)
    }
}




/*admin*/

/*get products*/
const adminGetProducts = async (req, res, next) => {
    try{
        const products = await Product.find({}).sort({category: 1}).select('name price category')
        return res.json(products)
    }catch(error){
        next(error)
    }
}

/*delete product*/
const adminDeleteProduct = async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id).orFail()
        res.json({message: "product removed"})
    }catch(error){
        next(error)
    }
}

/*create a product*/
const adminCreateProduct = async (req, res, next) => {
    try{
        const product = new Product()
        const {name, description, count, price, category, attributesTable} = req.body
        product.name = name
        product.description = description
        product.count = count
        product.price = price
        product.category = category
        if (attributesTable.length > 0){
            attributesTable.map((item) => {
                product.attrs.push(item)
            })
        }
        await product.save()
        res.json({
            message: "product created",
            productId: product._id
        })
    } catch (error){
        next(error)
    }
}

const adminUpdateProduct = async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id).orFail()
        const {name, description, count, price, category, attributesTable} = req.body
        product.name = name || product.name
        product.description = description || product.description
        product.count = count || product.count
        product.price = price || product.price
        product.category = category || product.category
        if (attributesTable.length > 0){
            product.attrs = []
            attributesTable.map((item) => {
                product.attrs.push(item)
            })
        }else{
            product.attrs = []
        }
        await product[0].save()                                         /*save() is not happy here i've added [0] to make it happy*/
        res.json({
            message: "product updated"
        })
    }catch (error) {
        next(error)
    }
}

/*upload file, an image for a product*/
const adminUpload = async (req, res, next) => {
    try{
        /*check if anything was uploaded*/
        if(!req.files || !! req.files.images === false) {
            return res.status(400).send("no files were uploaded.")
        }
        /*custom validator in utils, if error === false its good to upload*/
        const validateResult = imageValidate(req.files.images)
        if(validateResult.error){
            return res.status(400).send(validateResult.error)
        }

        const path = require("path")
        /*this is a string randomizer for the image path, it must first be installed through npm*/
        const { v4: uuidv4 } = require("uuid")

        const uploadDirectory = path.resolve(__dirname, "../../frontend/public/images/products")

        let product = await Product.findById(req.query.productId).orFail()

        let imagesTable = []
        if(Array.isArray(req.files.images)){
            imagesTable = req.files.images
        } else {
            imagesTable.push(req.files.images)
        }

        for(let image of imagesTable){
            let fileName = uuidv4 +path.extname(image.name)
            let uploadPath = uploadDirectory + "/" + fileName
            product.images.push({path: "/images/products/" + fileName})
            await image.mv(uploadPath, function (err) {
                if (err) {
                    return res.status(500).send(err)
                }
            })
        }
        await product[0].save()                                                     /*added [0] again to make it happy*/
        return res.send("Files uploaded!")

    }catch (error){
        next(error)
    }
}

/*deleting an image from a product*/
const adminDeleteProductImage = async (req, res, next) => {
    try{
        const imagePath = decodeURIComponent(req.params.imagePath)

        const path = require("path")
        const finalPath = path.resolve("../frontend/public") + imagePath

        /*file system module, will supply it with the path so that the image may be deleted*/
        const fs = require("fs")
        fs.unlink(finalPath, (error) => {
            if(error) {
                res.status(500).send(error)
            }
        })
        await Product.findOneAndUpdate({_id: req.params.productId}, {$pull: {images: {path: imagePath}}}).orFail()
        return res.end()
    }catch(error){
        next(error)
    }
}




module.exports = {getProducts, getProductById, getBestSellers, adminGetProducts, adminDeleteProduct, adminCreateProduct, adminUpdateProduct, adminUpload, adminDeleteProductImage}
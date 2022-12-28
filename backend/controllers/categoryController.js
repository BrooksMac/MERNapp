const Category = require("../models/CategoryModel")

const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({}).sort({name: "asc"}).orFail()  /*our first query, asc means ascendant order, orFail() propogates errors to our error handler in server.js*/
        res.json(categories)
    }catch (error) {
        next(error)
    }
}

const newCategory = async (req, res, next) => {
    try {
        const {category} = req.body
        if (!category){
            res.status(400).send("Category input is required")
        }
        /*find one category where the name of this category is equal to the input which has the variable category*/
        const categoryExists = await Category.findOne({name: category})
        if(categoryExists){
            res.status(400).send("Category already exists")
        }else{
            /*this creates the actual category*/
            const categoryCreated = await Category.create({
                name: category
            })
            /*this sends the contents of the created category from the DB*/
            res.status(201).send({categoryCreated: categoryCreated})
        }

    }catch (error) {
        next(error)
    }
}

const deleteCategory = async (req, res, next) => {
    try{
        const categoryExists = await Category.findOne({
            /*this is needed so that the category is correctly taken form the URL*/
            name: decodeURIComponent(req.params.category)
        }).orFail()
        await categoryExists.remove()
        res.json({categoryDeleted: true})
    }catch (error) {
        next(error)
    }
}
























/*saving attributes for a category*/
const saveAttr = async (req, res, next) => {
    const {key, val, categoryChosen} = req.body
    if(!key || !val || ! categoryChosen) {
        return res.status(400).send("All inputs are required")
    }

    try{
        /*this will split the string by the / and then only return the first string */
        const category = categoryChosen.split("/")[0]
        const categoryExists = await Category.findOne({name: category}).orFail()

        /*if attrs for this category exist we must check and see if the key already exists*/
        if(categoryExists.attrs.length > 0) {
            let keyDoesNotExistInDatabase = true

            categoryExists.attrs.map((item, idx) => {
                /*if key already exists for this category copy the values and add the requested value*/
                if(item.key === key){
                    keyDoesNotExistInDatabase = false
                    let copyAttributeValues = [...categoryExists.attrs[idx].value]
                    copyAttributeValues.push(val)
                    let newAttributeValues=[...new Set(copyAttributeValues)] /*using Set ensure values are unique*/
                    categoryExists.attrs[idx].value = newAttributeValues
                }
            })
            /*if key doesn't already exist add the key and values to the category*/
            if(keyDoesNotExistInDatabase){
                categoryExists.attrs.push({key: key, value: [val]})
            }
        } else {
            /*if it does not already exist simply push the new key and values to the category attrs array*/
            categoryExists.attrs.push({key: key, value: [val]})
        }
        await categoryExists.save()
        let cat = await Category.find({}).sort({name: "asc"})
        return res.status(201).json({categoriesUpdated: cat})
    }catch(error){
        next(error)
    }
}




/*must export all the different types of commands this could receive*/
module.exports = {getCategories, newCategory, deleteCategory, saveAttr}
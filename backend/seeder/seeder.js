const connectDB = require("../config/db")
connectDB()

/*get the data from the seeder files we made*/
const categoryData = require("./categories")
const productData = require("./products")
const reviewData = require("./reviews")
const userData = require("./users")
const orderData = require("./orders")

/*get the models the seeder data must conform to*/
const Category = require("../models/CategoryModel")
const Product = require("../models/ProductModel")
const Review = require("../models/ReviewModel")
const User = require("../models/UserModel")
const Order = require("../models/OrderModel")

const importData = async () => {
    try {
        await Category.collection.dropIndexes() /*indexes must be dropped as well.  await is used as DB operations are asynchronous and this ensures sync*/
        await Product.collection.dropIndexes()

        await Category.collection.deleteMany({}) /*get rid of data previously in the collections as to not append the same data twice*/
        await Product.collection.deleteMany({})
        await Review.collection.deleteMany({})
        await User.collection.deleteMany({})
        await Order.collection.deleteMany({})

        await Category.insertMany(categoryData) /*insert the data*/

        /*this is some crazy shit that has to do with mapping the reviews to a particular product*/
        const reviews = await Review.insertMany(reviewData)
        const sampleProducts = productData.map((product) => {
            reviews.map((review) => {
                product.reviews.push(review._id)
            })
            return {...product}
        })
        await Product.insertMany(sampleProducts)

        await User.insertMany(userData)
        await Order.insertMany(orderData)

        console.log("Seeder data proceeded successfully")
        process.exit()
    } catch (error) {
        console.error("Error while proccessing seeder data", error)
        process.exit(1);
    }
}
importData()


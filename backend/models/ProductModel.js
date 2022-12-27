/*this is what our database will look like*/

const mongoose = require("mongoose")

const Review = require("./ReviewModel") /*this is how imports work*/

/*since this definition is small we will define it here.*/
const imageSchema = mongoose.Schema({
    path: {type: String, required: true}
})

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
    },
    reviewsNumber: {
        type: Number,
    },
    sales: {
        type: Number,
        default: 0
    },
    //since there will be many attributes we will use an array every key can have one or many values associated to it
    attrs: [
        {key: {type: String}, value: {type: String}}
        // [{ key: "color", value: "red" }, { key: "size", value: "1 TB" }]
    ],

    //these are empty for now, will add info in the arrays later since these are objects not simple datatypes
    images: [imageSchema],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Review,
        }
    ]
}, {
    timestamps: true,
})
const Product = mongoose.model("Product", productSchema)

/*index's are used to aid in searching through databases*/
productSchema.index({name: "text", description: "text"},{name: "TextIndex" });
/*1 means ascending order, -1 means descending order*/
productSchema.index({"attrs.key":1, "attrs.value":1})

module.exports = Product /*this is how exports work*/
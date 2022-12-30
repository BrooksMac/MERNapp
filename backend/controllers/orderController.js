const Order = require("../models/OrderModel")
const Product = require("../models/ProductModel");
const ObjectId = require("mongodb").ObjectId;

const getUserOrders = async (req, res, next) => {
    try{
        /*the reason we have access to user here is because of the cookie token provided by verifyAuthToken*/
        const orders = await Order.find({user: ObjectId(req.user._id)})
        res.send(orders)
    }catch(error) {
        next(error)
    }
}

const getOrder = async (req, res, next) => {
    try{
        const order = await Order.findById(req.params.id).populate("user", "-password -isAdmin -_id -__v -createdAt -updatedAt").orFail()
        res.send(order)
    }catch(error) {
        next(error)
    }
}

const createOrder = async (req, res, next) => {
    try{
        const { cartItems, orderTotal, paymentMethod } = req.body
        if(!cartItems || !orderTotal || !paymentMethod){
            return res.status(400).send("All inputs are required")
        }

        /*get product IDs for updating the sales count of the product*/
        let ids = cartItems.map((item) => {
            return item.productID
        })

        /*get how many of them were purchased*/
        let qty = cartItems.map((item) => {
            return Number(item.quantity)
        })

        /*I don't understand how these are mapped properly guessing just 1:1 but this is how the products number of sales are updated*/
        await Product.find({_id: { $in: ids }}.then((products) => {     /*products becomes an array of all the products with the IDs in ids*/
            products.forEach(function(product, idx) {     /*then for each product the qty[idx] (idx is ++ after each product so that they correspond) is added to that product's sales*/
                product.sales += qty[idx]
                product.save()
            })
        }))

        const order = new Order({
            user: ObjectId(req.user._id),
            orderTotal: orderTotal,
            cartItems: cartItems,
            paymentMethod: paymentMethod
        })
        const createdOrder = await order.save()
        res.status(201).send(createdOrder)

    }catch(error) {
        next(error)
    }
}

const updateOrderToPaid = async (req, res, next) => {
    try{
        const order = await Order.findById(req.params.id).orFail()
        order.isPaid= true
        order.paidAt = Date.now()

        const updatedOrder = await order.save()
        res.send(updatedOrder)

    }catch(error) {
        next(error)
    }
}

const updateOrderToDelivered = async (req, res, next) => {
    try{
        const order = await Order.findById(req.params.id).orFail()
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const  updatedOrder = await order.save()
        res.send(updatedOrder)
    }catch(error) {
        next(error)
    }
}

const getOrders = async (req, res, next) => {
    try{
        const orders = await Order.find({}).populate("user", "-password").sort({
            paymentMethod: "desc"       /*A to Z*/
        })
        res.send(orders)

    }catch(error) {
        next(error)
    }
}

const getOrderForAnalysis = async (req, res, next) => {
    try{
        const start = new Date(req.params.date)
        start.setHours(0,0,0,0)
        const end = new Date(req.params.date)
        end.setHours(23, 59 ,59,999)

        const order = await Order.find ({
            createdAt: {
                $gte: start,
                $lte: end,
            }
        }).sort({createdAt: "asc"})

        res.send(order)

    }catch(error) {
        next(error)
    }
}



module.exports = {getUserOrders, getOrder, createOrder, updateOrderToPaid, updateOrderToDelivered, getOrders, getOrderForAnalysis}
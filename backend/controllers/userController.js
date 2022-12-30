const User = require("../models/UserModel")
const Review = require("../models/ReviewModel")
const Product = require("../models/ProductModel")
const {hashPassword, comparePasswords} = require("../utils/hashPassword")
const generateAuthToken = require("../utils/generateAuthToken")

const getUsers = async (req, res, next) => {
    try{
        /*no argument in .find means to grab all and -password grabs all params except for the password*/
        const users = await User.find({}).select("-password")
        return res.json(users)
    }catch(error){
        next(error)
    }
}

const registerUser = async (req, res, next) => {
    try{
        const {name, lastName, email, password} = req.body
        if(!(name && lastName && email && password)) {                             /*I changed name to firstName in my front end*/
            return res.status(400).send("All inputs are required")
        }

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).send("user exists")
        } else {
            const hashedPassword = hashPassword(password)
            const user = await User.create({
                name, lastName, email: email.toLowerCase(), password: hashedPassword
            });
            res
                .cookie("access_token", generateAuthToken(user._id, user.name, user.lastName, user.email, user.isAdmin), {httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict"}) /*this will allow a user after registering to automatically be logged in*/
                .status(201)
                .json({success: "User created", userCreated: {_id: user._id, name: user.name, lastName: user.lastName, email: user.email, isAdmin: user.isAdmin}})
        }
    }catch(error){
        next(error)
    }
}

const loginUser = async (req, res, next) =>{
    try{
        const {email, password, doNotLogout} = req.body          /*I may have changed doNotLogout to something else on the front end*/
        if(!(email && password)) {
            return res.status(400).send("All inputs are required")
        }

        const user = await User.findOne({email})
        if(user && comparePasswords(password, user.password)) {
            if (user)
            let cookieParams = {
                httpOnly:true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            }
            if (doNotLogout){
                cookieParams = {...cookieParams, maxAge: 1000 * 60} /*in milliseconds*/
            }
            return res.cookie("access_token", generateAuthToken(user._id, user.name, user.lastName, user.email, user.isAdmin), cookieParams).json({success: "user logged in", userLoggedIn: { _id: user._id, name: user.name, lastName: user.lastName, email: user.email, isAdmin: user.isAdmin, doNotLogout}})
        }else {
            return res.status(401).send("Wrong credentials")
        }
    } catch(error) {
        next(error)
    }
}

const getUserProfile = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id).orFail()
        return res.send(user)
    }catch(error){
        next(error)
    }
}


const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).orFail();
        user.name = req.body.name || user.name;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber;
        user.address = req.body.address;
        user.country = req.body.country;
        user.zipCode = req.body.zipCode;
        user.city = req.body.city;
        user.state = req.body.state;
        /*if the password is changed hash it before saving to the DB*/
        if (req.body.password !== user.password) {
            user.password = hashPassword(req.body.password);
        }
        await user.save();

        res.json({
            success: "user updated",
            userUpdated: {
                _id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } catch (err) {
        next(err);
    }
};


const writeReview = async (req, res, next) => {
    /*session is needed because we make two transaction here and if either one fails they must both fail*/
    const session = await Review.startSession();

    try{

        /*this part creates the review in the review collection*/
        const{comment, rating} = req.body
        /*validate the request*/
        if(!(comment && rating)){
            return res.status(400).send("All inputs are required")
        }
        /*create a review ID*/
        const ObjectId = require("mongodb").ObjectId;
        let reviewId = ObjectId()

        session.startTransaction()

        await Review.create([
            {
            _id: reviewId,
            comment: comment,
            rating: Number(rating),
                user: {_id: req.user._id, name: req.user.name + " " + req.user.lastName}
        }
        ], {session: session}) /*adding session*/

        /*this part assigns the review ID to the appropriate product's review array and recalculates the product rating*/
        const product = await Product.findById(req.params.productId).populate("reviews").session(session)
        /*verify that the user doesn't spam bomb this product*/
        const alreadyReviewed = product.reviews.find((user) => user.user._id.toString() === req.user._id.toString())
        if (alreadyReviewed){
            /*break the session since there was a failure on one end*/
            await session.abortTransaction()
            await session.endSession()
            return res.status(400).send("product already reviewed")
        }
        let prc = [...product.reviews]
        prc.push({rating: rating})
        product.reviews.push(reviewId)
        /*setting the product rating to be whatever the only review rating is*/
        if (product.reviews.length === 1){
            product.rating = Number(rating)
            product.reviewsNumber = 1
        } else {
            /*calculating average rating*/
            product.reviewsNumber = product.reviews.length
            product.rating = prc.map((item) => Number(item.rating)).reduce((sum, item) => sum + item, 0)/ product.reviews.length
        }
        await product.save()

        /*commit the session since both transactions were successful*/
        await session.commitTransaction()
        await session.endSession()

        res.send('review created')



    }catch(error) {
        await session.abortTransaction()
        next(error)
    }
}

const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id).select("name lastName email isAdmin").orFail()
        return res.send(user)
    }catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id).orFail()

        /*this is saying if the field is blank to assign the old value to the field*/
        user.name = req.body.name || user.name
        user.lastName = req.body.lastName || user.lastName
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin

        await user.save()
        res.send("user updated")

    }catch(error){

    }
}

const deleteUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id).orFail()
        await user.remove()
        res.send("user removed")
    }catch(error){
        next(error)
    }
}

module.exports = {getUsers, registerUser, loginUser, updateUserProfile, getUserProfile, writeReview, getUser, updateUser, deleteUser}
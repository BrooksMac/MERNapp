const jwt = require("jsonwebtoken")

const verifyIsLoggedIn = (req, res, next) => {
    try{
        const token = req.cookies.access_token
        if(!token) {
            return res.status(403).send("A token is required for authentication")
        }
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = decoded
            next()                      /*using this here is similar to passing the outlet like we did in the front end, the user can continue to their requested page.*/
        }catch (error){
            return res.status(401).send("Unauthorized. Invalid Token")
        }
    }catch (error){
        next(error)
    }
}

const verifyIsAdmin = (req, res, next) => {
    try{
        /*user was created in the previous middleware therefore it can be used here without being declared again*/
        if(req.user && req.user.isAdmin) {
            next()
        } else {
            return res.status(401).send("Unauthorized, admin required")
        }
    }catch (error){

    }
}


module.exports = {verifyIsLoggedIn, verifyIsAdmin}
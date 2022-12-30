const jwt = require("jsonwebtoken")

/*I changed name to firstName in front end*/
const generateAuthToken = (_id, name, lastName, email, isAdmin) =>{
    return jwt.sign(
        {_id, name, lastName, email, isAdmin},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "7h"})
}
module.exports = generateAuthToken()


const express = require('express')
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser')
const app = express()

const port = 3000 /*this should be the same port as front end*/

const apiRoutes = require("./routes/apiRoutes")

/*cannot post data to the server without this*/
app.use(express.json())



/* ************************************************ Begin Examples ********************************************************************************************************** */
/*
/!*example of middleware always executes regardless of URL because of app.use      If you want this to proceed to the next middle ware must use the third argument next*!/
app.use((req, res, next) => {
    console.log("this is middleware");
    next(); /!*Then call the next function*!/
})


/!*example of asynchronous error propagation          setTimeout() is simply an example of an asynchronous function*!/
app.get('/a', (req, res, next) => {
    setTimeout(() => {
        try {
            aconsole.log("asynchronous code"); /!*purposely misspelled console throws error*!/
        } catch (error) {
            next(error);
        }
    },1000)
})
/!*example of an error handling block*!/
app.use((error, req, res, next) => {
    console.error(error); /!*displays the error in the console*!/

    /!*this displays the error on the browser*!/
    res.status(500).json({
        message: error.message,
        stack: error.stack
    })
})
*/


/* *********************************************** End Examples *************************************************************************************************************** */

/*mongodb connection*/
const connectDB = require("./config/db")
connectDB();


/*by using app.get this middleware will only be called if the '/' url is called*/
app.get('/', (req, res) => {
    res.json({message: "API running..."})  /*modify this to get your front end page*/
})

/*this middleware will trigger when ANY req or res is called starting with the path /api */
app.use('/api', apiRoutes) /*apiRoutes is our api route handler*/

/*more middleware for uploading files*/
app.use(fileUpload);                                                                                               /*different from lecture, he had fileUpload()*/

/*more middleware for parsing cookies for authentication purposes*/
app.use(cookieParser())

app.use((error, req, res, next) => {
    console.error(error);

    res.status(500).json({
        message: error.message,
        stack: error.stack
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


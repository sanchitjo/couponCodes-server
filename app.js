const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(cors())

const morgan = require('morgan') //helps tracking the requests from routes

const dotenv = require('dotenv')
dotenv.config()

//connecting to the db
const mongoose = require('mongoose')

async function data() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('database connected!')
    } catch (error) {
        console.log(`DB connection error : ${error.message}`)
    }
} 
data();

//bring in the routes
const couponRoutes = require('./routes/coupon')

app.use('/coupon', couponRoutes)

let port = process.env.PORT;
if(port == null || port == ""){
    port = 8080
}
app.listen(port, () => console.log(`app is listening on port: ${port}`))
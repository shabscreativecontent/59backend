const express = require('express');
const app = express();
const cors = require("cors")
const mongoose = require('mongoose')
const connectDB = require('./config/database')
const routesHandler = require('./handler/handler.js');

require("dotenv").config({path: './config/.env'})


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


connectDB()


app.use('/', routesHandler);


const PORT = process.env.PORT || 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const postRoutes = require('./routes/post');
const signUp = require('./routes/auth');
const getUsers = require('./routes/user');
const nodemon = require('nodemon');
const expressValidator = require("express-validator");

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(expressValidator());
app.use(cookieParser());
app.use("/", postRoutes);
app.use("/", signUp);
app.use("/", getUsers);
app.use(nodemon); 

mongoose.connect(process.env.MY_URI,{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to db!");
})
.catch(err => console.log( err ));

mongoose.connection.on("error", err => {
    console.log(`Error while connecting : ${err}`); 
});

const port = 8080;
app.listen(port, ()=> {
    console.log('The app is listening on port 8080');
})
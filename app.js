const express=require("express");
const path=require("path");
const app=express();
const mainRouter = require('./routes/index.js');
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hostelManagementApplication');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const passport = require("passport");
const cookieSession = require("cookie-session");
app.use(cookieSession({
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(mainRouter);

app.listen(PORT,()=>{
    console.log("running on port " + PORT);
})

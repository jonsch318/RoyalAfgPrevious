const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const logger = require("./config/logger");

logger.error("Started")


const app = express();

//#region Passport config

require("./config/passport")(passport);

//#endregion

//#region Db Config

// Connection String
// I am using MongoDb Atlas free service for 512MB MongoDb storage. Username: sa Password: RoyalAfg
const db = require("./config/keys").MonoURI;

// Connect to Mongo
mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDb connected successfully");
    })
    .catch(err => console.log(err));

//#endregion

//#region Middleware

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Bodyparser => let nodejs decode request with bodies and form posts.
// Raw Json 
app.use(express.json());
//Form posts
app.use(express.urlencoded({
    extended: false
}))

//Express Session (Cookie) => remember logged in 
//app.use(cookieParser());
const sessionConfig = require("./config/auth").sessionConfig(mongoose)
app.use(sessionConfig);

//#endregion

//#region Authorization with Passport

app.use(passport.initialize());
app.use(passport.session())

//#endregion

//#region Preventions

// //xss
//app.use(require("./config/sanitizing").xssPrevention);

// //xsrf
//app.use(require("./config/sanitizing").xsrfPrevention);

//#endregion

//#region Routes

// Home Routes (index, about etc.) => home.js router
app.use("/", require("./routes/home"));

// User Routes (account/login, account/register, account/myAccount, etc.) => 
app.use("/account", require("./routes/users"));

//#endregion

// Port 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
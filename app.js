const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const cookieParser = require("cookie-parser");

const app = express();

//#region Db Config

// Connection String
// I am using MongoDb Atlas free service for 512MB MongoDb storage. Username: sa Password: RoyalAfg
const db = require("./config/keys").MonoURI;

// Connect to Mongo
mongoose.connect(db, {
        useNewUrlParser: true
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
app.use(session({
    name: "RoyalAfgSid",
    resave: false,
    saveUninitialized: false,
    secret: "gJv*iaBLn@k*!zp*ocWWfzvfoZaEz6a6#fU@$DL4",
    // store: new mongoStore({
    //     mongooseConnection: mongoose.connection
    // }),
    cookie: {
        httpOnly: 1000 * 60 * 60 * 24 * 3,
        sameSite: true,
        secure: false,
        // TODO: secure to true if https connection are possible.
    }
}));

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
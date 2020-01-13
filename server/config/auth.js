const session = require("express-session");
const mongoStore = require("connect-mongo")(session);

module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/account/login");
    },
    sessionConfig: function (mongoose) {
        return session({
            name: "RoyalAfgSid",
            resave: false,
            saveUninitialized: false,
            secret: "gJv*iaBLn@k*!zp*ocWWfzvfoZaEz6a6#fU@$DL4",
            store: new mongoStore({
                mongooseConnection: mongoose.connection
            }),
            cookie: {
                httpOnly: 1000 * 60 * 60 * 24 * 3,
                sameSite: true,
                secure: false,
                // TODO: secure to true if https connection are possible.
            }
        });
    }
}
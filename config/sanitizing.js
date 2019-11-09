const validator = require("express-validator");
const csurf = require("csurf");

const xsrfMiddleware = csurf({
    cookie: true,
})

module.exports = {
    // cross site scripting Prevention by sanitizing.
    xssPrevention: function (req, res, next) {
        for (let item in req.body) {
            validator.sanitize(item).escape();
        }
        next();
    },
    // cross site request forgery prevention by a token that is sent with every post and renewed with every get.
    xsrfPrevention: csurf({
        cookie: true
    }),
}
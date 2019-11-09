const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");
const {
    ensureAuth
} = require("../config/auth");

router.get("/login", (req, res) => {
    res.render("login");
})

//Login Handle
router.post("/login", (req, res, next) => {

    passport.authenticate("local", {
        successRedirect: "/account/myAccount",
        failureRedirect: "/account/login",
        failureFlash: false,
    })(req, res, next);
});

// Register
router.get("/register", (req, res) => {
    res.render("register");
});

//Register Handle
router.post("/register", (req, res, next) => {
    console.log(req.body);
    const {
        name,
        email,
        password,
        password2
    } = req.body;

    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({
            msg: "Please fill in all fields."
        });
    }
    // Passwords match
    if (password !== password2) {
        errors.push({
            msg: "Passwords do not match."
        })
    }
    // Validate if user with same email exists. (Username) possible
    User.findOne({
        email: email
    }).then(user => {
        if (user)
            errors.push({
                msg: "User with the same email already exists"
            })
    });

    if (errors.length > 0) {
        return res.json(errors);
    }

    //Hash Password (bcrypt or scrypt)
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            const newUser = new User({
                name,
                email,
                password: hash
            })
            //Save User
            newUser.save()
                .then(user => {
                    passport.authenticate("local", {
                        successRedirect: "/account/myAccount",
                        failureRedirect: "/account/login",
                        failureFlash: false,
                    })(req, res, next);
                })
                .catch(err => console.log(err))

        });
    });

});

router.post("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/");
});

router.get("/myAccount", ensureAuth, (req, res, next) => {
    res.render("myAccount", {
        user: req.user
    });
})



module.exports = router;
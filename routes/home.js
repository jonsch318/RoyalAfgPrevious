const express = require("express");
const router = express.Router();
const logger = require("../config/logger");

router.get("/", (req, res) => {
    logger.info("Home route called");
    res.render("index");
})

// If user calls ~/login it redirects it to ~/account/login, where the actual login takes place.
router.get("/login", (req, res) => {
    res.redirect("/account/login");
})

module.exports = router;
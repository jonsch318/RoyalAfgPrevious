const logger = require("./logger");

module.exports = function (app) {
    app.use((req, res, next) => {
        logger.debug("Routing", req.url);
        next();
    })
}
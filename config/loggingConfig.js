const logger = require("./logger");

module.exports = function (app) {
    app.use((req, res, next) => {
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        logger.debug("Routing towards %s (%s)", req.url, ip);
        next();
    })
}
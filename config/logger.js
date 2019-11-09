const winston = require("winston");
const mongoose = require("mongoose");
require("winston-mongodb");

const loggingFormat = winston.format.printf(({
    level,
    message,
    timestamp
}) => {
    return `[${timestamp}](${level}): ${message}`;
})

module.exports = winston.createLogger({
    level: "debug",
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp(),
        loggingFormat),
    transports: [
        new winston.transports.Console({
            format: winston.format.colorize({
                all: true,
            })
        }),
        new winston.transports.File({
            filename: "./logs/entire.log",
            level: "silly"
        }),
        new winston.transports.MongoDB({
            db: require("./keys").MongoURI,
        })
    ]
})
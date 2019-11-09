const winston = require("winston");
const {
    combine,
    timestamp,
    printf
} = winston.format;

const loggingFormat = winston.format.printf(({
    level,
    message,
    timestamp
}) => {
    return `[${timestamp}](${level}): ${message}`;
})

module.exports = winston.createLogger({
    level: "debug",
    format: combine(timestamp(), loggingFormat),
    transports: [
        new winston.transports.Console({
            format: winston.format.colorize({
                all: true,
            })
        }),
        // new winston.transports.File({
        //     filename: "./logs/entire.log",
        //     level: "silly"
        // })
    ]
})
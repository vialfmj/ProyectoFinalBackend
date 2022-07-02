const winston = require("winston")



let logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({level: 'verbose'}),
        new winston.transports.File({filename: 'error.log', level: 'error'})
    ]
})

module.exports = logger
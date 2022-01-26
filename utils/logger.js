const log4js = require('log4js'),
    path = require('path');

let logFilePath = path.join(__dirname + '/../../logs/global.log');

log4js.configure({
    appenders: {
        console: {
            type: 'stdout',
            encoding: 'utf-8',
            layout: {
                type: 'pattern',
                pattern: '%[ [%d{hh:mm:ss - dd.MM.yyyy}] [%p] - %m]',
            }
        },
        file: {
            type: 'dateFile',
            filename: logFilePath,
            pattern: '.yyyy-MM-dd-hh',
            compress: true,
            keepFileExt: true,
            layout: {
                type: 'pattern',
                pattern: '[%d{hh:mm:ss - dd.MM.yyyy}] [%p] - %m',
            }
        },
        logstash: {
            "type": "log4js-logstash-tcp",
            "host": "logstash",
            "port": 8089,
            /*"fields": {
                "instance": "MyAwsInstance",
                "source": "myApp",
                "environment": "development"
            } */
        }
    },
    categories: {
        console_only: {
            appenders: ['console'],
            level: 'trace'
        },
        default: {
            appenders: ['console', 'file', 'logstash'],
            level: 'info'
        }
    }
});
const logger = log4js.getLogger();
const consoleLogger = log4js.getLogger('console_only');

module.exports = {
    trace: (proc, msg, fields) => {
        consoleLogger.trace(msg, fields)
    },
    debug: (proc, msg, fields) => {
        consoleLogger.debug(msg, fields)
    },
    info: (proc, msg, fields) => {
        logger.info(msg, fields)
    },
    warn: (proc, msg, fields) => {
        logger.warn(msg, fields)
    },
    error: (proc, msg, fields) => {
        logger.error(msg, fields)
    },
    fatal: (proc, msg, fields) => {
        logger.fatal(msg, fields)
    }
};

module.exports.trace('LOG', `Logging to file: ${logFilePath}`);
module.exports.info('LOG', `Test`, {user: {username: "Samir", id: 34, rank: 2}});

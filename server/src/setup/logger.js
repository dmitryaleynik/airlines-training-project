const { createLogger, format, transports, } = require('winston');
const { combine, colorize, timestamp, printf, } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    colorize({ all: true, }),
    timestamp(),
    printf(info => `${new Date(info.timestamp).toUTCString()}: ${info.message}`)
  ),
  transports: [new transports.Console(),],
});

global.logger = logger;

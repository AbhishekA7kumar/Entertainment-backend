const winston = require('winston');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: process.env.mode === 'development' ? 'debug' : 'info',

  // deals with formatting of the log
  format: winston.format.combine(
    enumerateErrorFormat(),
    process.env.mode === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),

  // used to decide where to print the log
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    })
  ],
});

module.exports = logger;

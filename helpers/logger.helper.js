import winston from "winston";

import config from "../config/index.config.js";

const fileTransports = {
  level: config.logger.file.level,
  filename: config.logger.file.filename,
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
};

const consoleTransports = {
  level: config.logger.console.level,
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      const ts = timestamp.slice(0, 19).replace("T", " ");
      return `${ts} [${level.toUpperCase()}]: ${message}`;
    })
  ),
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(fileTransports),
    new winston.transports.Console(consoleTransports),
  ],
  exitOnError: false,
});

export default logger;

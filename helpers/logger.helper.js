import winston from "winston";

import config from "../config/index.config.js";

const formats = {
  file: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  console: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      const ts = timestamp.slice(0, 19).replace("T", " ");
      return `${ts} [${level.toUpperCase()}]: ${message}`;
    })
  ),
};

const transports = {
  file: new winston.transports.File({
    level: config.logger.file.level,
    filename: config.logger.file.filename,
    handleExceptions: true,
    format: formats.file,
  }),
  console: new winston.transports.Console({
    level: config.logger.console.level,
    handleExceptions: true,
    format: formats.console,
  }),
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [transports.file, transports.console],
  exitOnError: false,
});

export default logger;

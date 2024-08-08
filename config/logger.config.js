import config from "./index.config.js";

const env = config.server.node_env;

const loggerConfig = {
  file: {
    level: env === "production" ? "error" : "debug",
    filename: "./logs/logs.log",
  },
  console: {
    level: env === "production" ? "warn" : "debug",
  },
};

export default loggerConfig;

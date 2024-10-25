import envSchema from "env-schema";

const env = envSchema({
  dotenv: true,
  schema: {
    type: "object",
    required: [
      "PORT",
      "ORIGIN",
      "NODE_ENV",
      "REDIS_HOST",
      "REDIS_PORT",
      "ACCESS_TOKEN_SECRET",
      "ACCESS_TOKEN_EXPIRATION",
      "REFRESH_TOKEN_SECRET",
      "REFRESH_TOKEN_EXPIRATION",
    ],
    properties: {
      PORT: {
        type: "number",
      },
      ORIGIN: {
        type: "string",
      },
      NODE_ENV: {
        type: "string",
      },
      REDIS_HOST: {
        type: "string",
      },
      REDIS_PORT: {
        type: "number",
      },
      ACCESS_TOKEN_SECRET: {
        type: "string",
      },
      ACCESS_TOKEN_EXPIRATION: {
        type: "string",
      },
      REFRESH_TOKEN_SECRET: {
        type: "string",
      },
      REFRESH_TOKEN_EXPIRATION: {
        type: "string",
      },
    },
  },
});

/**
 * @global
 * @typedef {Object} Config
 *
 * @property {Object} server - Server configuration settings.
 * @property {number|string} server.port - The port number for the server to listen on.
 * @property {string} server.origin - The origin URL of the server.
 * @property {string} server.node_env - The environment the server is running in (e.g., development, production).
 *
 * @property {Object} database - Database configuration settings (to be defined).
 *
 * @property {Object} cache - Cache configuration settings.
 * @property {Object} cache.redis - Redis configuration settings.
 * @property {string} cache.redis.host - The host address of the Redis server.
 * @property {number|string} cache.redis.port - The port number of the Redis server.
 *
 * @property {Object} token - Token configuration settings.
 * @property {Object} token.access - Access token configuration settings.
 * @property {string} token.access.secret - Secret key used to sign the access token.
 * @property {Object} token.access.options - Options for the access token.
 * @property {string|number} token.access.options.expiresIn - Expiration time for the access token.
 *
 * @property {Object} token.refresh - Refresh token configuration settings.
 * @property {string} token.refresh.secret - Secret key used to sign the refresh token.
 * @property {Object} token.refresh.options - Options for the refresh token.
 * @property {string|number} token.refresh.options.expiresIn - Expiration time for the refresh token.
 *
 * @property {Object} logger - Logger configuration settings.
 * @property {Object} logger.file - File logging configuration settings.
 * @property {string} logger.file.level - Logging level for file logs (e.g., error, debug).
 * @property {string} logger.file.filename - File path for storing logs.
 * @property {Object} logger.console - Console logging configuration settings.
 * @property {string} logger.console.level - Logging level for console logs (e.g., warn, debug).
 */
const config = {
  server: {
    port: env.PORT,
    origin: env.ORIGIN,
    node_env: env.NODE_ENV,
  },
  database: {},
  cache: {
    redis: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
    },
  },
  token: {
    access: {
      secret: env.ACCESS_TOKEN_SECRET,
      options: {
        expiresIn: env.ACCESS_TOKEN_EXPIRATION,
      },
    },
    refresh: {
      secret: env.REFRESH_TOKEN_SECRET,
      options: {
        expiresIn: env.REFRESH_TOKEN_EXPIRATION,
      },
    },
  },
  logger: {
    file: {
      level: env.NODE_ENV === "production" ? "error" : "debug",
      filename: "./logs/logs.log",
    },
    console: {
      level: env.NODE_ENV === "production" ? "warn" : "debug",
    },
  },
};

export default config;

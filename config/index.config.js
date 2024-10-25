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
  }
};

export default config;

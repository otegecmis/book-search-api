import env from "./env.config.js";

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
};

export default config;

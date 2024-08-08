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

export default env;

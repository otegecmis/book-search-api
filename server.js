import app from "./app.js";

import redis from "./cache/redis.cache.js";
import postgres from "./database/postgres.database.js";

import config from "./config/index.config.js";
import logger from "./helpers/logger.helper.js";

async function start() {
  try {
    const port = config.server.port;

    await redis.connect();
    await postgres.connect();

    app.listen(port, () => {
      logger.info(`Server is running at ${port}.`);
    });
  } catch (err) {
    logger.error(err);
  }
}

start();

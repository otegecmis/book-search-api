import { PrismaClient } from "@prisma/client";

import logger from "../helpers/logger.helper.js";

/**
 * Postgres class.
 * @ignore
 */
class Postgres {
  /**
   * Creates an instance of Postgres.
   */
  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Connects to the PostgreSQL database.
   */
  async connect() {
    try {
      await this.prisma.$connect();
      logger.info("PostgreSQL connection successful.");
    } catch (err) {
      logger.error("PostgreSQL connection error:", err);
      throw new Error("Could not connect to PostgreSQL.");
    }
  }

  /**
   * Disconnects from the PostgreSQL database.
   */
  async disconnect() {
    try {
      await this.prisma.$disconnect();
      logger.info("PostgreSQL disconnection successful.");
    } catch (err) {
      logger.error("PostgreSQL disconnection error:", err);
      throw new Error("Could not disconnect from PostgreSQL.");
    }
  }
}

export default new Postgres();

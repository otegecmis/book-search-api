import { PrismaClient } from "@prisma/client";

import logger from "../helpers/logger.helper.js";

/**
 * Postgres class.
 * @class
 * @classdesc A class for the PostgreSQL database.
 */
class Postgres {
  /**
   * Creates an instance of Postgres.
   * Initializes the Prisma client.
   */
  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Connects to the PostgreSQL database.
   * @returns {Promise<void>} A promise that resolves when the connection is established.
   * @throws {Error} If an error occurs while connecting to the database.
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
   * @returns {Promise<void>} A promise that resolves when the disconnection is complete.
   * @throws {Error} If an error occurs while disconnecting from the database.
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

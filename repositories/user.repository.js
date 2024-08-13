import createError from "http-errors";

import logger from "../helpers/logger.helper.js";
import postgres from "../database/postgres.database.js";

/**
 * UserRepository class.
 * @class
 * @classdesc Class representing a user repository.
 */
class UserRepository {
  /**
   * Creates a new user in the database.
   * @param {object} user - The user object containing user details.
   * @returns {Promise<object>} A promise that resolves to the created user object.
   * @throws {createError.InternalServerError} If unable to create the user.
   */
  async createUser(user) {
    try {
      return await postgres.prisma.user.create({ data: user });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Unable to create the user at the moment.");
    }
  }

  /**
   * Retrieves a user by their ID.
   * @param {string} userID - The ID of the user to retrieve.
   * @returns {Promise<object|null>} A promise that resolves to the user object if found, or null if not found.
   * @throws {createError.InternalServerError} If unable to get the user by ID.
   */
  async getUserByID(userID) {
    try {
      return await postgres.prisma.user.findUnique({
        where: { id: String(userID) },
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Unable to get the userID at the moment.");
    }
  }

  /**
   * Retrieves a user by their email.
   * @param {string} email - The email of the user to retrieve.
   * @returns {Promise<object|null>} A promise that resolves to the user object if found, or null if not found.
   * @throws {createError.InternalServerError} If unable to get the user by email.
   */
  async getUserByEmail(email) {
    try {
      return await postgres.prisma.user.findUnique({
        where: { email: email },
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Unable to get the email at the moment.");
    }
  }

  /**
   * Updates a user's details in the database.
   * @param {string} userID - The ID of the user to update.
   * @param {object} data - The updated user data.
   * @returns {Promise<object>} A promise that resolves to the updated user object.
   * @throws {createError.InternalServerError} If unable to update the user.
   */
  async updateUser(userID, data) {
    try {
      return await postgres.prisma.user.update({
        where: { id: String(userID) },
        data,
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Unable to update the user at the moment.");
    }
  }
}

export default new UserRepository();

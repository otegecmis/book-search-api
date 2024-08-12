import bcrypt from "bcrypt";
import createError from "http-errors";
import gravatar from "gravatar";

import userRepository from "../repositories/user.repository.js";

/**
 * UsersService class.
 * @class
 * @classdesc Class representing a users service.
 */
class UsersService {
  /**
   * Creates a new user in the database.
   * @param {Object} user - The user object containing user details.
   * @returns {Promise<Object>} A promise that resolves to the created user object.
   * @throws {createError.UnprocessableEntity} If a user with the provided email already exists.
   * @throws {createError.InternalServerError} If an error occurs during user creation.
   */
  async createUser(user) {
    const userExists = await this.getUserByEmail(user.email);

    if (userExists) {
      throw createError.UnprocessableEntity("User already exists with the provided email.");
    }

    user.password = await bcrypt.hash(user.password, 10);
    return await userRepository.createUser(user);
  }

  /**
   * Retrieves a user by their email address.
   * @param {string} email - The email address of the user.
   * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not found.
   * @throws {createError.InternalServerError} If an error occurs while retrieving the user.
   */
  async getUserByEmail(email) {
    return await userRepository.getUserByEmail(email);
  }

  /**
   * Retrieves a user by their ID.
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not found.
   * @throws {createError.InternalServerError} If an error occurs while retrieving the user.
   */
  async getUserByID(id) {
    return await userRepository.getUserByID(id);
  }

  /**
   * Retrieves a user by their ID and formats the response.
   * @param {string} userID - The ID of the user to retrieve.
   * @returns {Promise<object>} A promise that resolves to an object containing the user's details including their gravatar URL.
   * @throws {Error} If the user cannot be retrieved or if an error occurs during the process.
   */
  async getUser(userID) {
    const user = await this.getUserByID(userID);

    return {
      userID: user.id,
      gravatar: gravatar.url(user.email, { s: "200", r: "pg", d: "mm", protocol: "https" }),
      name: user.name,
      surname: user.surname,
      createdAt: user.createdAt,
    };
  }

  /**
   * Checks if a plain password matches a hashed password.
   * @param {string} plainPassword - The plain password to be checked.
   * @param {string} hashedPassword - The hashed password to compare against.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the passwords match.
   * @throws {createError.InternalServerError} If an error occurs during password comparison.
   */
  async isValidPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async updateUser(userID, data) {
    return {
      message: "WIP: This is a placeholder response for the updateUser method.",
      userID: userID,
      data: data,
    };
  }

  async updateEmail(userID, data) {
    return {
      message: "WIP: This is a placeholder response for the updateEmail method.",
      userID: userID,
      data: data,
    };
  }

  async updatePassword(userID, data) {
    return {
      message: "WIP: This is a placeholder response for the updatePassword method.",
      userID: userID,
      data: data,
    };
  }

  async deactivateUser(userID) {
    return {
      message: "WIP: This is a placeholder response for the deactivateUser method.",
      userID: userID,
    };
  }
}

export default new UsersService();

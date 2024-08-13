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
   * @param {object} user - The user object containing user details.
   * @param {string} user.name - The name of the user.
   * @param {string} user.surname - The surname of the user.
   * @param {string} user.email - The email address of the user.
   * @param {string} user.password - The password of the user.
   * @returns {Promise<object>} A promise that resolves to the created user object.
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
   * @returns {Promise<object|null>} A promise that resolves to the user object if found, or null if not found.
   * @throws {createError.InternalServerError} If an error occurs while retrieving the user.
   */
  async getUserByEmail(email) {
    return await userRepository.getUserByEmail(email);
  }

  /**
   * Retrieves a user by their ID.
   * @param {string} id - The ID of the user.
   * @returns {Promise<object>} A promise that resolves to the user object.
   * @throws {createError.NotFound} If the user is not found.
   */
  async getUserByID(id) {
    const findUser = await userRepository.getUserByID(id);

    if (!findUser) {
      throw createError.NotFound("User not found.");
    }

    return findUser;
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

  /**
   * Updates a user's details.
   * @param {string} userID - The ID of the user to update.
   * @param {object} data - The updated user data.
   * @param {string} [data.name] - The updated name of the user.
   * @param {string} [data.surname] - The updated surname of the user.
   * @returns {Promise<object>} A promise that resolves to the updated user object.
   * @throws {createError.NotFound} If the user does not exist.
   */
  async updateUser(userID, data) {
    const findUser = await this.getUserByID(userID);
    const updatedUser = await userRepository.updateUser(findUser.id, data);

    return {
      userID: updatedUser.id,
      gravatar: gravatar.url(updatedUser.email, { s: "200", r: "pg", d: "mm", protocol: "https" }),
      name: updatedUser.name,
      surname: updatedUser.surname,
    };
  }

  /**
   * Updates a user's email address.
   * @param {string} userID - The ID of the user to update.
   * @param {object} data - The email update data.
   * @param {string} data.oldEmail - The current email of the user.
   * @param {string} data.newEmail - The new email of the user.
   * @param {string} data.password - The user's password to verify the email update.
   * @returns {Promise<object>} A promise that resolves to the updated email object.
   * @throws {createError.Unauthorized} If the password is incorrect.
   * @throws {createError.UnprocessableEntity} If the old email does not match the current email.
   */
  async updateEmail(userID, data) {
    const findUser = await this.getUserByID(userID);

    if (!(await this.isValidPassword(data.password, findUser.password))) {
      throw createError.Unauthorized("Invalid password.");
    }

    if (data.oldEmail !== findUser.email) {
      throw createError.UnprocessableEntity("Email does not match.");
    }

    const updatedUser = await userRepository.updateUser(findUser.id, { email: data.newEmail });

    return {
      userID: updatedUser.id,
      email: updatedUser.email,
    };
  }

  /**
   * Updates a user's password.
   * @param {string} userID - The ID of the user to update.
   * @param {object} data - The password update data.
   * @param {string} data.oldPassword - The user's current password.
   * @param {string} data.newPassword - The user's new password.
   * @returns {Promise<void>} A promise that resolves when the password is updated.
   * @throws {createError.Unauthorized} If the old password is incorrect.
   */
  async updatePassword(userID, data) {
    const findUser = await this.getUserByID(userID);

    if (!(await this.isValidPassword(data.oldPassword, findUser.password))) {
      throw createError.Unauthorized("Invalid password.");
    }

    data.newPassword = await bcrypt.hash(data.newPassword, 10);
    await userRepository.updateUser(findUser.id, {
      password: data.newPassword,
    });

    return;
  }

  /**
   * Deactivates a user account.
   * @param {string} userID - The ID of the user to deactivate.
   * @returns {Promise<void>} A promise that resolves when the user is deactivated.
   * @throws {createError.NotFound} If the user does not exist.
   */
  async deactivateUser(userID) {
    const findUser = await this.getUserByID(userID);
    await userRepository.updateUser(findUser.id, { status: "inactive" });
  }
}

export default new UsersService();

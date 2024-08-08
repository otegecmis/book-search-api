import createError from "http-errors";

import usersService from "./users.service.js";
import tokenService from "./token.service.js";

/**
 * AuthService class.
 * @class
 * @classdesc Service class for handling authentication.
 */
class AuthService {
  /**
   * Sign up a new user.
   * @param {object} user - The user object containing the user's information.
   * @returns {Promise<object>} A promise that resolves to the created user object.
   * @throws {createError.Conflict} If the email is already in use.
   * @throws {createError.InternalServerError} If an error occurs during user creation.
   */
  async signup(user) {
    const createdUser = await usersService.createUser(user);

    return {
      userID: createdUser.id,
      email: createdUser.email,
    };
  }

  /**
   * Sign in a user.
   * @param {object} user - The user object containing email and password.
   * @returns {Promise<object>} A promise that resolves to an object containing the user ID, access token, and refresh token.
   * @throws {createError.Unauthorized} If the email or password is invalid.
   * @throws {createError.InternalServerError} If an error occurs during sign in.
   */
  async signin(user) {
    const findUser = await usersService.getUserByEmail(user.email);

    if (!findUser) {
      throw createError.Unauthorized("Invalid email or password.");
    }

    const isValidPassword = await usersService.isValidPassword(user.password, findUser.password);

    if (!isValidPassword) {
      throw createError.Unauthorized("Invalid email or password.");
    }

    const access_token = await tokenService.createAccessToken(findUser.id);
    const refresh_token = await tokenService.createRefreshToken(findUser.id);

    return {
      userID: findUser.id,
      access_token,
      refresh_token,
    };
  }

  /**
   * Refreshes the access and refresh tokens for a given token.
   * @param {string} token - The refresh token to be verified and refreshed.
   * @returns {Promise<object>} A promise that resolves to an object containing the user ID and the new access and refresh tokens.
   * @throws {createError.Unauthorized} If the refresh token is invalid or expired.
   * @throws {createError.InternalServerError} If an error occurs during token refresh.
   */
  async refresh(token) {
    const userID = await tokenService.verifyRefreshToken(token);

    const access_token = await tokenService.createAccessToken(userID);
    const refresh_token = await tokenService.createRefreshToken(userID);

    return {
      userID,
      access_token,
      refresh_token,
    };
  }

  /**
   * Signs out the user by deleting the refresh token associated with the given token.
   * @param {string} refreshToken - The refresh token to be verified and deleted.
   * @returns {Promise<void>} A promise that resolves when the refresh token is deleted.
   * @throws {createError.Unauthorized} If the refresh token is invalid or expired.
   * @throws {createError.InternalServerError} If an error occurs during sign out.
   */
  async signout(refreshToken) {
    const userID = await tokenService.verifyRefreshToken(refreshToken);
    await tokenService.deleteRefreshToken(userID);
  }
}

export default new AuthService();

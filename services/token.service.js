import createError from "http-errors";
import jsonwebtoken from "jsonwebtoken";

import redisService from "./redis.service.js";

import config from "../config/index.config.js";
import logger from "../helpers/logger.helper.js";

/**
 * TokenService class.
 * @class
 * @classdesc Service class for token-related operations.
 */
class TokenService {
  /**
   * Creates an access token for the specified user ID.
   * @param {string} userID - The ID of the user.
   * @returns {string} The generated access token.
   * @throws {createError.InternalServerError} If unable to create the access token.
   */
  async createAccessToken(userID) {
    try {
      const secret = config.token.access.secret;
      const options = {
        expiresIn: config.token.access.options.expiresIn,
        issuer: "otegecmis.github.io",
        audience: String(userID),
      };

      return jsonwebtoken.sign({}, secret, options);
    } catch (error) {
      logger.error(error);
      throw createError.InternalServerError("Unable to create access token.");
    }
  }

  /**
   * Creates a refresh token for the specified user ID.
   * @param {string} userID - The ID of the user.
   * @returns {Promise<string>} The generated refresh token.
   * @throws {createError.InternalServerError} If unable to create the refresh token.
   */
  async createRefreshToken(userID) {
    try {
      const secret = config.token.refresh.secret;
      const options = {
        expiresIn: config.token.refresh.options.expiresIn,
        issuer: "otegecmis.github.io",
        audience: String(userID),
      };

      const refreshToken = jsonwebtoken.sign({}, secret, options);
      await redisService.set(String(userID), refreshToken, 86400);

      return refreshToken;
    } catch (error) {
      logger.error(error);
      throw createError.InternalServerError("Unable to create refresh token.");
    }
  }

  /**
   * Verifies the access token.
   * @param {string} accessToken - The access token to be verified.
   * @returns {object} The decoded access token.
   * @throws {createError.Unauthorized} If the access token is invalid or expired.
   */
  async verifyAccessToken(accessToken) {
    try {
      return jsonwebtoken.verify(accessToken, config.token.access.secret);
    } catch (error) {
      throw createError.Unauthorized("Please sign in again.");
    }
  }

  /**
   * Verifies the refresh token and returns the user ID.
   * @param {string} refreshToken - The refresh token to be verified.
   * @returns {Promise<string>} The user ID extracted from the refresh token.
   * @throws {createError.Unauthorized} If the refresh token is invalid or expired.
   */
  async verifyRefreshToken(refreshToken) {
    try {
      const secret = config.token.refresh.secret;
      const payload = jsonwebtoken.verify(refreshToken, secret);
      const userID = payload.aud;

      const storedRefreshToken = await redisService.get(userID);

      if (refreshToken !== storedRefreshToken) {
        throw createError.Unauthorized("Please sign in again.");
      }

      return userID;
    } catch (error) {
      throw createError.Unauthorized("Please sign in again.");
    }
  }

  /**
   * Deletes the refresh token associated with the specified user ID.
   * @param {string} userID - The ID of the user.
   * @returns {Promise<void>} A promise that resolves when the refresh token is deleted.
   * @throws {createError.InternalServerError} If unable to delete the refresh token.
   */
  async deleteRefreshToken(userID) {
    try {
      await redisService.del(userID);
    } catch (error) {
      logger.error(error);
      throw createError.InternalServerError("Unable to delete refresh token.");
    }
  }
}

export default new TokenService();

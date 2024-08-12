import usersService from "../services/users.service.js";

/**
 * UsersController class.
 * @class
 * @classdesc Controller class for managing user-related operations.
 */
class UsersController {
  /**
   * Retrieves a user by their ID.
   * @param {Object} req - The request object.
   * @param {Object} req.params - The route parameters.
   * @param {string} req.params.userID - The ID of the user to retrieve.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<object>} A promise that resolves with the user data.
   * @throws {Error} If an error occurs while retrieving the user.
   */
  async getUser(req, res, next) {
    try {
      const userID = req.params.userID;
      const result = await usersService.getUser(userID);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates a user's name and surname.
   * @param {Object} req - The request object.
   * @param {Object} req.params - The route parameters.
   * @param {string} req.params.userID - The ID of the user to update.
   * @param {Object} req.body - The request body containing the new user data.
   * @param {string} req.body.name - The new name of the user.
   * @param {string} req.body.surname - The new surname of the user.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<object>} A promise that resolves with the updated user data.
   * @throws {Error} If an error occurs while updating the user or if the user is not authorized.
   */
  async updateUser(req, res, next) {
    try {
      const userID = req.params.userID;

      if (userID !== req.payload.aud) {
        return res.status(403).json({ message: "You are not authorized to perform this action." });
      }

      const result = await usersService.updateUser(userID, {
        name: req.body.name,
        surname: req.body.surname,
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates a user's email address.
   * @param {Object} req - The request object.
   * @param {Object} req.params - The route parameters.
   * @param {string} req.params.userID - The ID of the user to update.
   * @param {Object} req.body - The request body containing the new email data.
   * @param {string} req.body.oldEmail - The current email address of the user.
   * @param {string} req.body.newEmail - The new email address of the user.
   * @param {string} req.body.password - The user's password to confirm the email update.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<object>} A promise that resolves with the updated email data.
   * @throws {Error} If an error occurs while updating the user's email or if the user is not authorized.
   */
  async updateEmail(req, res, next) {
    try {
      const userID = req.params.userID;

      if (userID !== req.payload.aud) {
        return res.status(403).json({ message: "You are not authorized to perform this action." });
      }

      const result = await usersService.updateEmail(userID, {
        oldEmail: req.body.oldEmail,
        newEmail: req.body.newEmail,
        password: req.body.password,
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates a user's password.
   * @param {Object} req - The request object.
   * @param {Object} req.params - The route parameters.
   * @param {string} req.params.userID - The ID of the user to update.
   * @param {Object} req.body - The request body containing the new password data.
   * @param {string} req.body.oldPassword - The user's current password.
   * @param {string} req.body.newPassword - The user's new password.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<object>} A promise that resolves with the updated password data.
   * @throws {Error} If an error occurs while updating the user's password or if the user is not authorized.
   */
  async updatePassword(req, res, next) {
    try {
      const userID = req.params.userID;

      if (userID !== req.payload.aud) {
        return res.status(403).json({ message: "You are not authorized to perform this action." });
      }

      const result = await usersService.updatePassword(userID, {
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword,
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Deactivates a user account.
   * @param {Object} req - The request object.
   * @param {Object} req.params - The route parameters.
   * @param {string} req.params.userID - The ID of the user to deactivate.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<void>} A promise that resolves when the user's account is deactivated.
   * @throws {Error} If an error occurs while deactivating the user or if the user is not authorized.
   */
  async deactivateUser(req, res, next) {
    try {
      const userID = req.params.userID;

      if (userID !== req.payload.aud) {
        return res.status(403).json({ message: "You are not authorized to perform this action." });
      }

      await usersService.deactivateUser(userID);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();

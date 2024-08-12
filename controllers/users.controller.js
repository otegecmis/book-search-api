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
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<void>} A promise that resolves when the user data is retrieved and sent in the response.
   * @throws {Error} If an error occurs while retrieving the user.
   */
  async getUser(req, res, next) {
    try {
      const { userID } = req.params;
      const result = await usersService.getUser(userID);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();

import authService from "../services/auth.service.js";

/**
 * AuthController class.
 * @class
 * @classdesc Controller class for handling authentication.
 */
class AuthController {
  /**
   * Handles user signup.
   * @param {object} req - The request object.
   * @param {object} req.body - The body of the request containing user details.
   * @param {string} req.body.name - The name of the user.
   * @param {string} req.body.surname - The surname of the user.
   * @param {string} req.body.email - The email of the user.
   * @param {string} req.body.password - The password of the user.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<void>} A promise that resolves when the user is created and the response is sent.
   * @throws {Error} If an error occurs during signup.
   */
  async signup(req, res, next) {
    try {
      const user = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
      };

      const result = await authService.signup(user);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles user signin.
   * @param {object} req - The request object.
   * @param {object} req.body - The body of the request containing user credentials.
   * @param {string} req.body.email - The email of the user.
   * @param {string} req.body.password - The password of the user.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<void>} A promise that resolves when the user is authenticated and the response is sent.
   * @throws {Error} If an error occurs during signin.
   */
  async signin(req, res, next) {
    try {
      const user = {
        email: req.body.email,
        password: req.body.password,
      };

      const result = await authService.signin(user);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles token refresh.
   * @param {object} req - The request object.
   * @param {object} req.body - The body of the request containing the refresh token.
   * @param {string} req.body.refreshToken - The refresh token.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<void>} A promise that resolves when the token is refreshed and the response is sent.
   * @throws {Error} If an error occurs during token refresh.
   */
  async refresh(req, res, next) {
    try {
      const refreshToken = req.body.refreshToken;
      const result = await authService.refresh(refreshToken);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles user signout.
   * @param {object} req - The request object.
   * @param {object} req.body - The body of the request containing the refresh token.
   * @param {string} req.body.refreshToken - The refresh token.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<void>} A promise that resolves when the user is signed out and the response is sent.
   * @throws {Error} If an error occurs during signout.
   */
  async signout(req, res, next) {
    try {
      const refreshToken = req.body.refreshToken;
      await authService.signout(refreshToken);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

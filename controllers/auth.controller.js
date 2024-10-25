import authService from "../services/auth.service.js";

/**
 * AuthController class.
 * @ignore
 */
class AuthController {
  /**
   * Handles user signup.
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

  /**
   * Activates a user account.
   */
  async activate(req, res, next) {
    try {
      const user = {
        email: req.body.email,
        password: req.body.password,
      };
      await authService.activate(user);

      res.status(200).json({ message: "User activated successfully." });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

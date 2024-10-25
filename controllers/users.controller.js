import usersService from "../services/users.service.js";

/**
 * UsersController class.
 * @ignore
 */
class UsersController {
  /**
   * Retrieves a user by their ID.
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
   */
  async updateUser(req, res, next) {
    try {
      const userID = req.params.userID;

      if (userID !== req.payload.aud) {
        return res.status(403).json({ message: "You are not authorized to update this user." });
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
   */
  async updateEmail(req, res, next) {
    try {
      const userID = req.params.userID;

      if (userID !== req.payload.aud) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update email for this user." });
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
   */
  async updatePassword(req, res, next) {
    try {
      const userID = req.params.userID;

      if (userID !== req.payload.aud) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update password for this user." });
      }

      await usersService.updatePassword(userID, {
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword,
      });

      res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Deactivates a user account.
   */
  async deactivateUser(req, res, next) {
    try {
      const userID = req.params.userID;

      if (userID !== req.payload.aud) {
        return res.status(403).json({ message: "You are not authorized to deactivate this user." });
      }

      await usersService.deactivateUser(userID);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();

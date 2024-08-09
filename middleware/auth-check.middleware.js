import createError from "http-errors";

import tokenService from "../services/token.service.js";
import usersService from "../services/users.service.js";

const authCheck = {
  isSignIn: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];

      if (!authHeader) throw createError.Unauthorized("Please log in.");

      const bearerToken = authHeader.split(" ");
      req.payload = await tokenService.verifyAccessToken(bearerToken[1]);

      next();
    } catch (error) {
      next(error);
    }
  },
  isAdmin: async (req, res, next) => {
    try {
      const userID = req.payload.aud;
      const user = await usersService.getUserByID(userID);

      if (user.role !== "admin") {
        return next(createError.Unauthorized("You are not authorized to perform this action."));
      }

      next();
    } catch (error) {
      return next(
        createError.InternalServerError("An error occurred while verifying your authorization.")
      );
    }
  },
};

export default authCheck;

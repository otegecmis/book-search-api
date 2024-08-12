import { param } from "express-validator";
import { validationCheck } from "../middleware/validation-check.middleware.js";

const usersValidator = {
  getUser: [
    param("userID")
      .notEmpty()
      .withMessage("User ID is required.")
      .isUUID()
      .withMessage("User ID must be a UUID."),
    validationCheck,
  ],
};

export default usersValidator;

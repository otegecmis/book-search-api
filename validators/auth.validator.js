import { body } from "express-validator";
import { validationCheck } from "../middleware/validation-check.middleware.js";

const sharedValidators = {
  body: {
    email: body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Email must be a valid email address.")
      .normalizeEmail(),
    password: body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    refreshToken: body("refreshToken")
      .trim()
      .notEmpty()
      .withMessage("Refresh token is required.")
      .isJWT()
      .withMessage("Invalid refresh token."),
  },
};

const authValidator = {
  signup: [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required.")
      .isString()
      .withMessage("Name must be a string."),
    body("surname")
      .trim()
      .notEmpty()
      .withMessage("Surname is required.")
      .isString()
      .withMessage("Surname must be a string."),
    sharedValidators.body.email,
    sharedValidators.body.password,
    validationCheck,
  ],
  signin: [sharedValidators.body.email, sharedValidators.body.password, validationCheck],
  refresh: [sharedValidators.body.refreshToken, validationCheck],
  signout: [sharedValidators.body.refreshToken, validationCheck],
};

export default authValidator;

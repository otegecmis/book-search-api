import { body, param } from "express-validator";
import { validationCheck } from "../middleware/validation-check.middleware.js";

const sharedValidator = {
  params: {
    userID: param("userID")
      .notEmpty()
      .withMessage("User ID is required.")
      .isUUID()
      .withMessage("User ID must be a UUID."),
  },
};

const usersValidator = {
  getUser: [
    param("userID")
      .notEmpty()
      .withMessage("User ID is required.")
      .isUUID()
      .withMessage("User ID must be a UUID."),
    validationCheck,
  ],
  updateUser: [
    sharedValidator.params.userID,
    body("name").optional().trim().isString().withMessage("Name must be a string."),
    body("surname").optional().trim().isString().withMessage("Surname must be a string."),
    validationCheck,
  ],
  updateEmail: [
    sharedValidator.params.userID,
    body("oldEmail")
      .notEmpty()
      .withMessage("Old email is required.")
      .isEmail()
      .withMessage("Old email must be a valid email address."),
    body("newEmail")
      .notEmpty()
      .withMessage("New email is required.")
      .isEmail()
      .withMessage("New email must be a valid email address."),
    body("password").notEmpty().withMessage("Password is required."),
    validationCheck,
  ],
  updatePassword: [
    sharedValidator.params.userID,
    body("oldPassword").notEmpty().withMessage("Old password is required."),
    body("newPassword").notEmpty().withMessage("New password is required."),
    validationCheck,
  ],
  deactivateUser: [sharedValidator.params.userID, validationCheck],
};

export default usersValidator;

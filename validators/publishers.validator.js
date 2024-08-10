import { body, param, query } from "express-validator";
import { validationCheck } from "../middleware/validation-check.middleware.js";

const sharedValidators = {
  params: {
    publisherID: param("publisherID")
      .notEmpty()
      .withMessage("Publisher ID is required.")
      .isInt()
      .withMessage("Publisher ID must be an integer."),
  },
};

const publishersValidator = {
  createPublisher: [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required.")
      .isString()
      .withMessage("Name must be a string."),
    body("country")
      .trim()
      .notEmpty()
      .withMessage("Country is required.")
      .isString()
      .withMessage("Country must be a string."),
    validationCheck,
  ],
  getPublishers: [
    query("currentPage")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Current page must be a positive integer."),
    query("perPage")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Per page must be a positive integer."),
    validationCheck,
  ],
  getPublisherByID: [sharedValidators.params.publisherID, validationCheck],
  updatePublisher: [
    body("name").optional().trim().isString().withMessage("Name must be a string."),
    body("country").optional().trim().isString().withMessage("Country must be a string."),
    validationCheck,
  ],
  deletePublisher: [sharedValidators.params.publisherID, validationCheck],
};

export default publishersValidator;

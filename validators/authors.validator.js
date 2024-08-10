import { body, param, query } from "express-validator";
import { validationCheck } from "../middleware/validation-check.middleware.js";

const sharedValidators = {
  params: {
    authorID: param("authorID")
      .notEmpty()
      .withMessage("Author ID is required.")
      .isInt()
      .withMessage("Author ID must be an integer."),
  },
  queries: {
    currentPage: query("currentPage")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Current page must be a positive integer."),
    perPage: query("perPage")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Per page must be a positive integer."),
  },
};

const authorsValidator = {
  createAuthor: [
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
  getAuthors: [
    sharedValidators.queries.currentPage,
    sharedValidators.queries.perPage,
    validationCheck,
  ],
  getAuthorByID: [sharedValidators.params.authorID, validationCheck],
  getBooksByAuthorID: [
    sharedValidators.params.authorID,
    sharedValidators.queries.currentPage,
    sharedValidators.queries.perPage,
    validationCheck,
  ],
  updateAuthor: [
    sharedValidators.params.authorID,
    body("name").optional().trim().isString().withMessage("Name must be a string."),
    body("country").optional().trim().isString().withMessage("Country must be a string."),
    validationCheck,
  ],
  deleteAuthor: [sharedValidators.params.authorID, validationCheck],
};

export default authorsValidator;

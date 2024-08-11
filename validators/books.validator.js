import { body, param, query } from "express-validator";
import { validationCheck } from "../middleware/validation-check.middleware.js";

const booksValidator = {
  createBook: [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required.")
      .isString()
      .withMessage("Title must be a string."),
    body("authorID")
      .notEmpty()
      .withMessage("Author ID is required.")
      .isInt()
      .withMessage("Author ID must be an integer."),
    body("image")
      .trim()
      .notEmpty()
      .withMessage("Image URL is required.")
      .isURL()
      .withMessage("Image must be a valid URL."),
    body("publisherID")
      .notEmpty()
      .withMessage("Publisher ID is required.")
      .isInt()
      .withMessage("Publisher ID must be an integer."),
    body("published")
      .notEmpty()
      .withMessage("Published date is required.")
      .isISO8601()
      .withMessage("Published date must be a valid date."),
    body("isbn13")
      .notEmpty()
      .withMessage("ISBN-13 is required.")
      .isISBN(13)
      .withMessage("ISBN-13 must be a valid ISBN-13 number."),
    body("isbn10")
      .notEmpty()
      .withMessage("ISBN-10 is required.")
      .isISBN(10)
      .withMessage("ISBN-10 must be a valid ISBN-10 number."),
    body("status").trim().notEmpty().withMessage("Status is required."),
    validationCheck,
  ],
  getBookByISBN: [param("isbn").notEmpty().withMessage("ISBN is required."), validationCheck],
  getBooks: [
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
};

export default booksValidator;

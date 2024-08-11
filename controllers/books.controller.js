import booksService from "../services/books.service.js";

/**
 * BooksController class.
 * @class
 * @classdesc Controller class for managing books.
 */
class BooksController {
  /**
   * Creates a new book in the system.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<object>} A promise that resolves to the created book object.
   * @throws {Error} If an error occurs while creating the book.
   */
  async createBook(req, res, next) {
    try {
      const book = {
        title: req.body.title,
        authorID: req.body.authorID,
        image: req.body.image,
        publisherID: req.body.publisherID,
        published: req.body.published,
        isbn13: req.body.isbn13,
        isbn10: req.body.isbn10,
        status: req.body.status,
      };
      const result = await booksService.createBook(book);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves a paginated list of books.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<object>} A promise that resolves to an object containing the list of books and pagination information.
   * @throws {Error} If an error occurs while retrieving the books.
   */
  async getBooks(req, res, next) {
    try {
      const { currentPage, perPage } = req.query;
      const result = await booksService.getBooks(currentPage, perPage);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves a book by its ISBN.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<object>} A promise that resolves to the book object.
   * @throws {Error} If an error occurs while retrieving the book or if the book is not found.
   */
  async getBookByISBN(req, res, next) {
    try {
      const { isbn } = req.params;
      const result = await booksService.getBookByISBN(isbn);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new BooksController();

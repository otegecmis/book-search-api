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
   * @param {object} req.body - The body of the request containing the book details.
   * @param {string} req.body.title - The title of the book.
   * @param {string} req.body.authorID - The ID of the author.
   * @param {string} req.body.image - The URL of the book's cover image.
   * @param {string} req.body.publisherID - The ID of the publisher.
   * @param {string} req.body.published - The published date of the book.
   * @param {string} req.body.isbn13 - The ISBN-13 of the book.
   * @param {string} req.body.isbn10 - The ISBN-10 of the book.
   * @param {string} req.body.status - The status of the book (e.g., available, unavailable).
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
   * @param {object} req.query - The query parameters for pagination.
   * @param {number} [req.query.currentPage] - The current page number.
   * @param {number} [req.query.perPage] - The number of books to retrieve per page.
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
   * @param {object} req.params - The route parameters.
   * @param {string} req.params.isbn - The ISBN of the book to retrieve.
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

  /**
   * Updates a book in the system.
   * @param {object} req - The request object.
   * @param {object} req.params - The request parameters.
   * @param {string} req.params.bookID - The ID of the book to update.
   * @param {object} req.body - The body of the request containing the updated book details.
   * @param {string} [req.body.title] - The updated title of the book (optional).
   * @param {string} [req.body.authorID] - The updated ID of the author (optional).
   * @param {string} [req.body.image] - The updated URL of the book's cover image (optional).
   * @param {string} [req.body.publisherID] - The updated ID of the publisher (optional).
   * @param {string} [req.body.published] - The updated published date of the book (optional).
   * @param {string} [req.body.isbn13] - The updated ISBN-13 of the book (optional).
   * @param {string} [req.body.isbn10] - The updated ISBN-10 of the book (optional).
   * @param {string} [req.body.status] - The updated status of the book (optional).
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<object>} A promise that resolves to the updated book object.
   * @throws {createError.NotFound} If the book is not found.
   * @throws {createError.InternalServerError} If an error occurs while updating the book.
   */
  async updateBook(req, res, next) {
    try {
      const bookID = req.params.bookID;
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
      const result = await booksService.updateBook(bookID, book);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Deletes a book from the system.
   * @param {object} req - The request object.
   * @param {object} req.params - The route parameters.
   * @param {string} req.params.bookID - The ID of the book to delete.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<object>} A promise that resolves to the result of the delete operation.
   * @throws {Error} If an error occurs while deleting the book.
   */
  async deleteBook(req, res, next) {
    try {
      const { bookID } = req.params;
      const result = await booksService.deleteBook(bookID);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new BooksController();

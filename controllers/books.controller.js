import booksService from "../services/books.service.js";

/**
 * BooksController class.
 * @ignore
 */
class BooksController {
  /**
   * Creates a new book.
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
   * Retrieves a book by its ID.
   */
  async getBookByID(req, res, next) {
    try {
      const bookID = req.params.bookID;
      const result = await booksService.getBookByID(bookID);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves a book by its ISBN.
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
   * Updates a book.
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
   * Deletes a book.
   */
  async deleteBook(req, res, next) {
    try {
      const { bookID } = req.params;
      await booksService.deleteBook(bookID);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new BooksController();

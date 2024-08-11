import createError from "http-errors";

import logger from "../helpers/logger.helper.js";
import postgres from "../database/postgres.database.js";

/**
 * BookRepository class.
 * @class
 * @classdesc Repository class for managing books.
 */
class BookRepository {
  /**
   * Counts the number of books in the database.
   * @returns {Promise<number>} A promise that resolves to the total number of books in the database.
   * @throws {createError.InternalServerError} If there is an error while counting the books.
   */
  async countBooks() {
    try {
      return await postgres.prisma.book.count();
    } catch (error) {
      logger.error(error);
      throw createError(500, "Could not count books.");
    }
  }

  /**
   * Counts the number of books by a specific author ID.
   * @param {number} authorID - The ID of the author whose books are to be counted.
   * @returns {Promise<number>} A promise that resolves to the total number of books by the specified author.
   * @throws {createError.InternalServerError} If there is an error while counting the books.
   */
  async countBooksByAuthorID(authorID) {
    try {
      return await postgres.prisma.book.count({
        where: { authorID: Number(authorID) },
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Could not count books by author ID.");
    }
  }

  /**
   * Counts the number of books by a specific publisher ID.
   * @param {number} publisherID - The ID of the publisher whose books are to be counted.
   * @returns {Promise<number>} A promise that resolves to the total number of books by the specified publisher.
   * @throws {createError.InternalServerError} If there is an error while counting the books.
   */
  async countBooksByPublisherID(publisherID) {
    try {
      return await postgres.prisma.book.count({
        where: { publisherID: Number(publisherID) },
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Could not count books by publisher ID.");
    }
  }

  /**
   * Creates a new book in the database.
   * @param {object} book - The book object to be created.
   * @returns {Promise<object>} A promise that resolves to the created book object.
   * @throws {createError.InternalServerError} If the book could not be created.
   */
  async createBook(book) {
    try {
      return await postgres.prisma.book.create({ data: book });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Could not create book.");
    }
  }

  /**
   * Retrieves a paginated list of books from the database.
   * @param {number} [currentPage=1] - The current page number.
   * @param {number} [perPage=10] - The number of books to display per page.
   * @returns {Promise<object>} A promise that resolves to an object containing the paginated list of books and pagination information.
   * @throws {createError.InternalServerError} If there is an error fetching the books.
   */
  async getBooks(currentPage = 1, perPage = 10) {
    try {
      currentPage = parseInt(currentPage, 10);
      perPage = parseInt(perPage, 10);

      if (isNaN(currentPage) || currentPage < 1) {
        currentPage = 1;
      }

      if (isNaN(perPage) || perPage < 1) {
        perPage = 10;
      }

      const skip = (currentPage - 1) * perPage;
      const countBooks = await this.countBooks();
      const books = await postgres.prisma.book.findMany({
        skip: skip,
        take: perPage,
        select: {
          id: true,
          title: true,
          image: true,
          published: true,
          isbn13: true,
          isbn10: true,
          author: {
            select: {
              id: true,
              name: true,
              country: true,
            },
          },
          publisher: {
            select: {
              id: true,
              name: true,
              country: true,
            },
          },
        },
      });

      return {
        books,
        countBooks,
        currentPage,
        perPage,
        totalPages: Math.ceil(countBooks / perPage),
      };
    } catch (error) {
      logger.error(error);
      throw createError(500, "Could not fetch books.");
    }
  }

  /**
   * Retrieves a book from the database by its ID.
   * @param {string} bookID - The ID of the book to retrieve.
   * @returns {Promise<object|null>} A promise that resolves to the book object, or null if not found.
   * @throws {createError.InternalServerError} If there is an error retrieving the book.
   */
  async getBookByID(bookID) {
    try {
      return await postgres.prisma.book.findUnique({
        where: { id: String(bookID) },
        include: {
          author: true,
          publisher: true,
        },
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Could not fetch book by ID.");
    }
  }

  /**
   * Retrieves books from the database by ISBN.
   * @param {string} isbn - The ISBN of the book(s) to retrieve.
   * @returns {Promise<Array<object>>} A promise that resolves to an array of book objects matching the ISBN.
   * @throws {createError.InternalServerError} If there is an error fetching books by ISBN.
   */
  async getBooksByISBN(isbn) {
    try {
      let query = {};

      if (isbn.length === 10) {
        query = {
          isbn10: isbn,
        };
      } else {
        query = {
          isbn13: isbn,
        };
      }

      return await postgres.prisma.book.findMany({
        where: { ...query },
        select: {
          id: true,
          title: true,
          image: true,
          published: true,
          isbn13: true,
          isbn10: true,
          author: {
            select: {
              id: true,
              name: true,
              country: true,
            },
          },
          publisher: {
            select: {
              id: true,
              name: true,
              country: true,
            },
          },
        },
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Could not fetch books by ISBN.");
    }
  }
}

export default new BookRepository();

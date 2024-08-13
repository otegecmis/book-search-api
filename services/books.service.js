import createError from "http-errors";

import bookRepository from "../repositories/book.repository.js";

import authorsService from "./authors.service.js";
import publishersService from "./publishers.service.js";

/**
 * BooksService class.
 * @class
 * @classdesc Service class for managing books.
 */
class BooksService {
  /**
   * Counts the number of books by a specific author.
   * @param {string} authorID - The ID of the author whose books are to be counted.
   * @returns {Promise<number>} A promise that resolves to the number of books by the specified author.
   * @throws {createError.InternalServerError} If an error occurs while counting the books by the author.
   */
  async countBooksByAuthorID(authorID) {
    return await bookRepository.countBooksByAuthorID(authorID);
  }

  /**
   * Counts the number of books by a specific publisher.
   * @param {string} publisherID - The ID of the publisher whose books are to be counted.
   * @returns {Promise<number>} A promise that resolves to the number of books by the specified publisher.
   * @throws {createError.InternalServerError} If an error occurs while counting the books by the publisher.
   */
  async countBooksByPublisherID(publisherID) {
    return await bookRepository.countBooksByPublisherID(publisherID);
  }

  /**
   * Creates a new book in the system.
   * @param {object} book - The book object to be created.
   * @param {string} book.title - The title of the book.
   * @param {string} book.authorID - The ID of the author of the book.
   * @param {string} book.image - The URL of the book's cover image.
   * @param {string} book.publisherID - The ID of the publisher of the book.
   * @param {string} book.published - The published date of the book.
   * @param {string} book.isbn13 - The ISBN-13 of the book.
   * @param {string} book.isbn10 - The ISBN-10 of the book.
   * @param {string} book.status - The status of the book.
   * @returns {Promise<object>} A promise that resolves to the created book object.
   * @throws {createError.Conflict} If the ISBN-10 or ISBN-13 already exists.
   * @throws {createError.NotFound} If the author or publisher does not exist.
   * @throws {createError.InternalServerError} If an error occurs while creating the book.
   */
  async createBook(book) {
    const searchISBN10 = await bookRepository.getBooksByISBN(book.isbn10);

    if (searchISBN10.length > 0) {
      throw createError(409, "ISBN-10 already exists.");
    }

    const searchISBN13 = await bookRepository.getBooksByISBN(book.isbn13);

    if (searchISBN13.length > 0) {
      throw createError(409, "ISBN-13 already exists.");
    }

    await authorsService.getAuthorByID(book.authorID);
    await publishersService.getPublisherByID(book.publisherID);

    return await bookRepository.createBook(book);
  }

  /**
   * Retrieves a paginated list of books.
   * @param {number} currentPage - The current page number for pagination.
   * @param {number} perPage - The number of books to retrieve per page.
   * @returns {Promise<object>} A promise that resolves to an object containing the list of books and pagination information.
   * @throws {createError.InternalServerError} If an error occurs while retrieving books.
   */
  async getBooks(currentPage, perPage) {
    return await bookRepository.getBooks(currentPage, perPage);
  }

  /**
   * Retrieves a book by its ID.
   * @param {string} bookID - The ID of the book to retrieve.
   * @returns {Promise<object>} A promise that resolves to the book object.
   * @throws {createError.NotFound} If the book is not found.
   * @throws {createError.InternalServerError} If an error occurs while retrieving the book.
   */
  async getBookByID(bookID) {
    const findBook = await bookRepository.getBookByID(bookID);

    if (!findBook) {
      throw createError(404, "Book does not exist, please check the book ID.");
    }

    return findBook;
  }

  /**
   * Retrieves a book by its ISBN (ISBN-10 or ISBN-13).
   * @param {string} isbn - The ISBN of the book to retrieve.
   * @returns {Promise<object>} A promise that resolves to the book object.
   * @throws {createError.NotFound} If the book is not found.
   * @throws {createError.InternalServerError} If an error occurs while retrieving the book.
   */
  async getBookByISBN(isbn) {
    const findISBN = await bookRepository.getBooksByISBN(isbn);

    if (!findISBN.length > 0) {
      throw createError(404, "Book not found.");
    }

    const book = findISBN[0];

    return {
      id: book.id,
      title: book.title,
      author: book.author.name,
      image: book.image,
      publisher: book.publisher.name,
      published: book.published,
      isbn13: book.isbn13,
      isbn10: book.isbn10,
    };
  }

  /**
   * Updates a book's information in the system.
   * @param {string} bookID - The ID of the book to update.
   * @param {object} book - The book object containing updated information.
   * @param {string} [book.title] - The updated title of the book (optional).
   * @param {string} [book.authorID] - The updated ID of the author (optional).
   * @param {string} [book.image] - The updated URL of the book's cover image (optional).
   * @param {string} [book.publisherID] - The updated ID of the publisher (optional).
   * @param {string} [book.published] - The updated published date of the book (optional).
   * @param {string} [book.isbn13] - The updated ISBN-13 of the book (optional).
   * @param {string} [book.isbn10] - The updated ISBN-10 of the book (optional).
   * @param {string} [book.status] - The updated status of the book (optional).
   * @returns {Promise<object>} A promise that resolves to the updated book object.
   * @throws {createError.NotFound} If the book is not found.
   * @throws {createError.InternalServerError} If an error occurs while updating the book.
   */
  async updateBook(bookID, book) {
    const findBook = await this.getBookByID(bookID);
    return await bookRepository.updateBook(findBook.id, book);
  }

  /**
   * Deletes a book from the system.
   * @param {string} bookID - The ID of the book to delete.
   * @returns {Promise<void>} A promise that resolves when the book is successfully deleted.
   * @throws {createError.NotFound} If the book is not found.
   * @throws {createError.InternalServerError} If an error occurs while deleting the book.
   */
  async deleteBook(bookID) {
    const findBook = await this.getBookByID(bookID);
    await bookRepository.deleteBook(findBook.id);
  }
}

export default new BooksService();

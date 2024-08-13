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
   * Creates a new book in the system.
   * @param {object} book - The book object to be created.
   * @returns {Promise<object>} A promise that resolves to the created book object.
   * @throws {createError.Conflict} If the ISBN-10 or ISBN-13 already exists.
   * @throws {createError.NotFound} If the author or publisher does not exist.
   * @throws {createError.InternalServerError} If an error occurs while creating the book.
   */
  async createBook(book) {
    const searchISBN10 = await bookRepository.getBooksByISBN(book.isbn10);

    if (searchISBN10.length > 0) {
      throw createError(409, "ISB-10 already exists.");
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
}

export default new BooksService();

import createError from "http-errors";

import authorRepository from "../repositories/author.repository.js";
import booksService from "./books.service.js";

/**
 * AuthorsService class.
 * @class
 * @classdesc Service class for managing authors.
 */
class AuthorsService {
  /**
   * Creates a new author.
   * @param {object} author - The author data.
   * @returns {Promise<object>} A promise that resolves to the created author object.
   * @throws {Error} If an error occurs while creating the author.
   */
  async createAuthor(author) {
    return await authorRepository.createAuthor(author);
  }

  /**
   * Retrieves a paginated list of authors.
   * @param {number} [currentPage=1] - The current page number for pagination.
   * @param {number} [perPage=10] - The number of authors to retrieve per page.
   * @returns {Promise<object>} A promise that resolves to an object containing the paginated list of authors.
   * @throws {Error} If an error occurs while retrieving authors.
   */
  async getAuthors(currentPage, perPage) {
    return await authorRepository.getAuthors(currentPage, perPage);
  }

  /**
   * Retrieves an author by their ID.
   * @param {string} authorID - The ID of the author to retrieve.
   * @returns {Promise<object>} A promise that resolves to the author object.
   * @throws {Error} If the author does not exist.
   */
  async getAuthorByID(authorID) {
    const findAuthor = await authorRepository.getAuthorByID(authorID);

    if (!findAuthor) {
      throw createError(404, "Author does not exist, please check the author ID.");
    }

    return findAuthor;
  }

  /**
   * Updates an author's details.
   * @param {string} authorID - The ID of the author to update.
   * @param {object} author - The updated author data.
   * @returns {Promise<object>} A promise that resolves to the updated author object.
   * @throws {Error} If the author does not exist or if an error occurs while updating the author.
   */
  async updateAuthor(authorID, author) {
    const findAuthor = await this.getAuthorByID(authorID);
    return await authorRepository.updateAuthor(findAuthor.id, author);
  }

  /**
   * Deletes an author by their ID if they have no books associated with them.
   * @param {string} authorID - The ID of the author to delete.
   * @returns {Promise<object>} A promise that resolves to the deleted author object.
   * @throws {createError.NotFound} If the author does not exist.
   * @throws {createError.Conflict} If the author has books associated with them and cannot be deleted.
   * @throws {createError.InternalServerError} If an error occurs while deleting the author.
   */
  async deleteAuthor(authorID) {
    const findAuthor = await this.getAuthorByID(authorID);
    const countBooksByAuthorID = await booksService.countBooksByAuthorID(findAuthor.id);

    if (countBooksByAuthorID > 0) {
      throw createError(409, "Author has books associated with them and cannot be deleted.");
    }

    return await authorRepository.deleteAuthor(findAuthor.id);
  }
}

export default new AuthorsService();

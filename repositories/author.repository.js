import createError from "http-errors";

import logger from "../helpers/logger.helper.js";
import postgres from "../database/postgres.database.js";

/**
 * AuthorRepository class.
 * @class
 * @classdesc Class representing an author repository.
 */
class AuthorRepository {
  /**
   * Counts the number of authors in the database.
   * @returns {Promise<number>} A promise that resolves to the total number of authors in the database.
   * If an error occurs, it logs the error and resolves to 0.
   */
  async countAuthors() {
    try {
      return await postgres.prisma.author.count();
    } catch (error) {
      logger.error(error);
      return 0;
    }
  }

  /**
   * Creates a new author in the database.
   * @param {object} author - The author object to be created.
   * @returns {Promise<object>} A promise that resolves to the created author object.
   * @throws {createError.InternalServerError} If unable to create the author.
   */
  async createAuthor(author) {
    try {
      return await postgres.prisma.author.create({ data: author });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Unable to create the author at the moment.");
    }
  }

  /**
   * Retrieves a paginated list of authors from the database.
   * @param {number} [currentPage=1] - The current page number for pagination.
   * @param {number} [perPage=10] - The number of authors to retrieve per page.
   * @returns {Promise<object>} A promise that resolves to an object containing the paginated list of authors.
   * @throws {createError.InternalServerError} If unable to retrieve the authors.
   */
  async getAuthors(currentPage = 1, perPage = 10) {
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
      const countAuthors = await this.countAuthors();
      const authors = await postgres.prisma.author.findMany({
        skip,
        take: perPage,
      });

      return {
        authors,
        countAuthors,
        currentPage,
        perPage,
        totalPages: Math.ceil(countAuthors / perPage),
      };
    } catch (error) {
      logger.error(error);
      throw createError(500, "Unable to get the authors at the moment.");
    }
  }

  /**
   * Retrieves an author by their ID.
   * @param {number} authorID - The ID of the author.
   * @returns {Promise<object|null>} A promise that resolves to the author object if found, or null if not found.
   * @throws {createError.InternalServerError} If unable to retrieve the author by ID.
   */
  async getAuthorByID(authorID) {
    try {
      return await postgres.prisma.author.findUnique({
        where: { id: Number(authorID) },
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Unable to get the author by ID at the moment.");
    }
  }

  /**
   * Updates an author in the database.
   * @param {number} authorID - The ID of the author to update.
   * @param {object} author - The updated author data.
   * @returns {Promise<object>} A promise that resolves to the updated author object.
   * @throws {createError.InternalServerError} If unable to update the author.
   */
  async updateAuthor(authorID, author) {
    try {
      return await postgres.prisma.author.update({
        where: { id: Number(authorID) },
        data: author,
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Unable to update the author at the moment.");
    }
  }

  /**
   * Deletes an author from the database.
   * @param {number} authorID - The ID of the author to delete.
   * @returns {Promise<void>} A promise that resolves when the author is deleted.
   * @throws {createError.InternalServerError} If unable to delete the author.
   */
  async deleteAuthor(authorID) {
    try {
      return await postgres.prisma.author.delete({
        where: { id: Number(authorID) },
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Unable to delete the author at the moment.");
    }
  }
}

export default new AuthorRepository();

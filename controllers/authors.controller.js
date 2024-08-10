import authorsService from "../services/authors.service.js";

/**
 * AuthorsController class.
 * @class
 * @classdesc Controller class for managing authors.
 */
class AuthorsController {
  /**
   * Creates a new author in the system.
   * @param {object} req - The request object, containing the author details.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<object>} - A promise that resolves to the created author object.
   * @throws {Error} - If an error occurs while creating the author, such as validation errors or database issues.
   */
  async createAuthor(req, res, next) {
    try {
      const author = {
        name: req.body.name,
        country: req.body.country,
      };
      const result = await authorsService.createAuthor(author);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves a paginated list of authors.
   * @param {object} req - The request object.
   * @param {number} [req.query.currentPage=1] - The current page number for pagination.
   * @param {number} [req.query.perPage=10] - The number of authors to retrieve per page.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<object>} - A promise that resolves to an object containing the list of authors and pagination info.
   * @throws {Error} - If an error occurs while retrieving authors.
   */
  async getAuthors(req, res, next) {
    try {
      const { currentPage, perPage } = req.query;
      const result = await authorsService.getAuthors(currentPage, perPage);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves an author by their ID.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<object>} - A promise that resolves to the author object.
   * @throws {Error} - If an error occurs while retrieving the author or if the author is not found.
   */
  async getAuthorByID(req, res, next) {
    try {
      const { authorID } = req.params;
      const result = await authorsService.getAuthorByID(authorID);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates an author with new data.
   * @param {object} req - The request object.
   * @param {string} [req.body.name] - The updated name of the author.
   * @param {string} [req.body.country] - The updated country of the author.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<object>} - A promise that resolves to the updated author object.
   * @throws {Error} - If an error occurs while updating the author or if the author is not found.
   */
  async updateAuthor(req, res, next) {
    try {
      const { authorID } = req.params;
      const author = {
        name: req.body.name,
        country: req.body.country,
      };
      const result = await authorsService.updateAuthor(authorID, author);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Deletes an author by their ID.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} - A promise that resolves when the author is successfully deleted.
   * @throws {Error} - If an error occurs while deleting the author or if the author is not found.
   */
  async deleteAuthor(req, res, next) {
    try {
      const { authorID } = req.params;
      await authorsService.deleteAuthor(authorID);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthorsController();

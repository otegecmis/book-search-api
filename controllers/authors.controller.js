import authorsService from "../services/authors.service.js";

/**
 * AuthorsController class.
 * @ignore
 */
class AuthorsController {
  /**
   * Creates a new author.
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

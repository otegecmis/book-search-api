import publishersService from "../services/publishers.service.js";

/**
 * PublishersController class.
 * @class
 * @classdesc Controller class for managing publishers.
 */
class PublishersController {
  /**
   * Creates a new publisher.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function for error handling.
   * @returns {Promise<object>} - A promise that resolves to the created publisher object.
   * @throws {Error} - If an error occurs while creating the publisher, such as validation errors or database issues.
   */
  async createPublisher(req, res, next) {
    try {
      const publisher = {
        name: req.body.name,
        country: req.body.country,
      };
      const result = await publishersService.createPublisher(publisher);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves a paginated list of publishers.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<object>} - A promise that resolves to an object containing the list of publishers and pagination information.
   * @throws {Error} - If an error occurs while retrieving the publishers.
   */
  async getPublishers(req, res, next) {
    try {
      const { currentPage, perPage } = req.query;
      const result = await publishersService.getPublishers(currentPage, perPage);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves a publisher by ID.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<object>} - A promise that resolves to the publisher object if found.
   * @throws {Error} - If an error occurs while retrieving the publisher or if the publisher is not found.
   */
  async getPublisherByID(req, res, next) {
    try {
      const { publisherID } = req.params;
      const result = await publishersService.getPublisherByID(publisherID);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates a publisher by ID.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<object>} - A promise that resolves to the updated publisher object.
   * @throws {Error} - If an error occurs while updating the publisher or if the publisher is not found.
   */
  async updatePublisher(req, res, next) {
    try {
      const { publisherID } = req.params;
      const publisher = {
        name: req.body.name,
        country: req.body.country,
      };
      const result = await publishersService.updatePublisher(publisherID, publisher);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Deletes a publisher by ID.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} - A promise that resolves when the publisher is successfully deleted.
   * @throws {Error} - If an error occurs while deleting the publisher or if the publisher is not found.
   */
  async deletePublisher(req, res, next) {
    try {
      const { publisherID } = req.params;
      await publishersService.deletePublisher(publisherID);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new PublishersController();

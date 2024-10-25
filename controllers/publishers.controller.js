import publishersService from "../services/publishers.service.js";

/**
 * PublishersController class.
 * @ignore
 */
class PublishersController {
  /**
   * Creates a new publisher.
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

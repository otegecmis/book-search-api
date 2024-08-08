import indexService from "../services/index.service.js";

/**
 * IndexController class.
 * @class
 * @classdesc Controller class for index routes.
 */
class IndexController {
  /**
   * Handles the request for the welcome page.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>} A promise that resolves when the response is sent.
   * @throws {Error} If an error occurs while fetching the welcome message.
   */
  async welcomePage(req, res) {
    try {
      const result = await indexService.welcomePage();

      res.json({
        message: result,
      });
    } catch (error) {
      res.status(500).json("An error occurred while fetching the welcome message.");
    }
  }
}

export default new IndexController();

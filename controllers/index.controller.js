import indexService from "../services/index.service.js";

/**
 * IndexController class.
 * @ignore
 */
class IndexController {
  /**
   * Handles the request for the welcome page.
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

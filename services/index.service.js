/**
 * IndexService class.
 * @class
 * @classdesc Service class for index routes.
 */
class IndexService {
  /**
   * Returns a welcome message for the API.
   * @returns {string} The welcome message.
   */
  async welcomePage() {
    return "Welcome to the API! 🚀";
  }
}

export default new IndexService();

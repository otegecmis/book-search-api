import createError from "http-errors";

import logger from "../helpers/logger.helper.js";
import postgres from "../database/postgres.database.js";

/**
 * PublisherRepository class.
 * @class
 * @classdesc Repository class for interacting with publishers.
 */
class PublisherRepository {
  /**
   * Counts the number of publishers in the database.
   * @returns {Promise<number>} A promise that resolves to the total number of publishers.
   * If an error occurs, it logs the error and resolves to 0.
   */
  async countPublishers() {
    try {
      return await postgres.prisma.publisher.count();
    } catch (error) {
      logger.error(error);
      return 0;
    }
  }

  /**
   * Creates a new publisher in the database.
   * @param {object} publisher - The publisher data.
   * @returns {Promise<object>} A promise that resolves to the created publisher object.
   * @throws {createError.InternalServerError} If an error occurs while creating the publisher.
   */
  async createPublisher(publisher) {
    try {
      return await postgres.prisma.publisher.create({ data: publisher });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Unable to create the publisher at the moment.");
    }
  }

  /**
   * Retrieves a list of publishers with pagination support.
   * @param {number} [currentPage=1] - The current page number for pagination.
   * @param {number} [perPage=10] - The number of publishers to retrieve per page.
   * @returns {Promise<object>} A promise that resolves to an object containing the list of publishers, pagination information, and total number of publishers.
   * @throws {createError.InternalServerError} If an error occurs while retrieving publishers.
   */
  async getPublishers(currentPage = 1, perPage = 10) {
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
      const countPublishers = await this.countPublishers();
      const publishers = await postgres.prisma.publisher.findMany({
        skip: skip,
        take: perPage,
      });

      return {
        publishers,
        countPublishers,
        currentPage,
        perPage,
        totalPages: Math.ceil(countPublishers / perPage),
      };
    } catch (error) {
      logger.error(error);
      throw createError(500, "Unable to retrieve publishers at the moment.");
    }
  }

  /**
   * Retrieves a publisher by its ID.
   * @param {number} publisherID - The ID of the publisher to retrieve.
   * @returns {Promise<object|null>} A promise that resolves to the publisher object if found, or null if not found.
   * @throws {createError.InternalServerError} If an error occurs while retrieving the publisher by ID.
   */
  async getPublisherByID(publisherID) {
    try {
      return await postgres.prisma.publisher.findUnique({
        where: { id: Number(publisherID) },
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Unable to get the publisher by ID at the moment.");
    }
  }

  /**
   * Updates a publisher in the database.
   * @param {number} publisherID - The ID of the publisher to update.
   * @param {object} publisher - The updated publisher data.
   * @returns {Promise<object>} A promise that resolves to the updated publisher object.
   * @throws {createError.InternalServerError} If an error occurs while updating the publisher.
   */
  async updatePublisher(publisherID, publisher) {
    try {
      return await postgres.prisma.publisher.update({
        where: { id: Number(publisherID) },
        data: publisher,
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Unable to update the publisher at the moment.");
    }
  }

  /**
   * Deletes a publisher from the database.
   * @param {number} publisherID - The ID of the publisher to delete.
   * @returns {Promise<object>} A promise that resolves to the deleted publisher object.
   * @throws {createError.InternalServerError} If an error occurs while deleting the publisher.
   */
  async deletePublisher(publisherID) {
    try {
      return await postgres.prisma.publisher.delete({
        where: { id: Number(publisherID) },
      });
    } catch (error) {
      logger.error(error);
      throw createError(500, "Unable to delete the publisher at the moment.");
    }
  }
}

export default new PublisherRepository();

import createError from "http-errors";

import publisherRepository from "../repositories/publisher.repository.js";
import booksService from "./books.service.js";

/**
 * PublishersService class.
 * @class
 * @classdesc Service class for managing publishers.
 */
class PublishersService {
  /**
   * Creates a new publisher.
   * @param {object} publisher - The publisher object to be created.
   * @returns {Promise<object>} A promise that resolves to the created publisher object.
   * @throws {createError.InternalServerError} If an error occurs while creating the publisher.
   */
  async createPublisher(publisher) {
    return await publisherRepository.createPublisher(publisher);
  }

  /**
   * Retrieves publishers based on the specified pagination parameters.
   * @param {number} currentPage - The current page number.
   * @param {number} perPage - The number of publishers to retrieve per page.
   * @returns {Promise<object>} A promise that resolves to an object containing the list of publishers and pagination information.
   * @throws {createError.InternalServerError} If an error occurs while retrieving publishers.
   */
  async getPublishers(currentPage, perPage) {
    return await publisherRepository.getPublishers(currentPage, perPage);
  }

  /**
   * Retrieves a publisher by ID.
   * @param {string} publisherID - The ID of the publisher to retrieve.
   * @returns {Promise<object>} The publisher object.
   * @throws {createError.NotFound} If the publisher does not exist.
   */
  async getPublisherByID(publisherID) {
    const findPublisher = await publisherRepository.getPublisherByID(publisherID);

    if (!findPublisher) {
      throw new createError.NotFound(`Publisher does not exist.`);
    }

    return findPublisher;
  }

  /**
   * Updates a publisher.
   * @param {string} publisherID - The ID of the publisher to update.
   * @param {object} publisher - The updated publisher object.
   * @returns {Promise<object>} A promise that resolves to the updated publisher object.
   * @throws {createError.NotFound} If the publisher does not exist.
   * @throws {createError.InternalServerError} If an error occurs while updating the publisher.
   */
  async updatePublisher(publisherID, publisher) {
    const findPublisher = await this.getPublisherByID(publisherID);
    return await publisherRepository.updatePublisher(findPublisher.id, publisher);
  }

  /**
   * Deletes a publisher by their ID if they have no books associated with them.
   * @param {string} publisherID - The ID of the publisher to delete.
   * @returns {Promise<object>} A promise that resolves to the deleted publisher object.
   * @throws {createError.NotFound} If the publisher does not exist.
   * @throws {createError.Conflict} If the publisher has books associated with them and cannot be deleted.
   * @throws {createError.InternalServerError} If an error occurs while deleting the publisher.
   */
  async deletePublisher(publisherID) {
    const findPublisher = await this.getPublisherByID(publisherID);
    const countBooksByPublisherID = await booksService.countBooksByPublisherID(findPublisher.id);

    if (countBooksByPublisherID > 0) {
      throw createError.Conflict("Publisher has books and cannot be deleted.");
    }

    return await publisherRepository.deletePublisher(findPublisher.id);
  }
}

export default new PublishersService();

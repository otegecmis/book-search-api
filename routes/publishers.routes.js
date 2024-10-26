/**
 * @swagger
 * /api/publishers:
 *   post:
 *     summary: Create Publisher
 *     description: Only authorized users can access this endpoint.
 *     tags: [Publishers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *             example:
 *               name: Bloomsbury Publishing
 *               country: United Kingdom
 *     responses:
 *       201:
 *         description: Created
 *   get:
 *     summary: Get Publishers
 *     tags: [Publishers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: currentPage
 *         schema:
 *           type: int
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: int
 *     responses:
 *       200:
 *         description: OK
 * /api/publishers/{publisherID}:
 *   get:
 *     summary: Get Publisher by ID
 *     tags: [Publishers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: publisherID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *   put:
 *     summary: Update Publisher
 *     description:  Only authorized users can access this endpoint.
 *     tags: [Publishers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: publisherID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *             example:
 *               name: Allen & Unwin
 *               country: Australia
 *     responses:
 *       200:
 *         description: OK
 *   delete:
 *     summary: Delete Publisher
 *     description: Only authorized users can access this endpoint.
 *     tags: [Publishers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: publisherID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content
 */
import express from "express";

import publishersController from "../controllers/publishers.controller.js";
import publishersValidator from "../validators/publishers.validator.js";

import rateLimiters from "../middleware/rate-limit.middleware.js";
import authCheck from "../middleware/auth-check.middleware.js";

const router = express.Router();

router
  .post(
    "/",
    rateLimiters.database,
    authCheck.isSignIn,
    authCheck.isAdmin,
    publishersValidator.createPublisher,
    publishersController.createPublisher
  )
  .get(
    "/",
    rateLimiters.common,
    authCheck.isSignIn,
    publishersValidator.getPublishers,
    publishersController.getPublishers
  )
  .get(
    "/:publisherID",
    rateLimiters.common,
    authCheck.isSignIn,
    publishersValidator.getPublisherByID,
    publishersController.getPublisherByID
  )
  .put(
    "/:publisherID",
    rateLimiters.database,
    authCheck.isSignIn,
    authCheck.isAdmin,
    publishersValidator.updatePublisher,
    publishersController.updatePublisher
  )
  .delete(
    "/:publisherID",
    rateLimiters.database,
    authCheck.isSignIn,
    authCheck.isAdmin,
    publishersValidator.deletePublisher,
    publishersController.deletePublisher
  );

export default router;

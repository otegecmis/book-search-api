import express from "express";

import publishersController from "../controllers/publishers.controller.js";
import publishersValidator from "../validators/publishers.validator.js";

import rateLimiters from "../middleware/rate-limit.middleware.js";
import { auth } from "../middleware/auth-check.middleware.js";

const router = express.Router();

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
 */
router.post(
  "/",
  rateLimiters.database,
  auth.isSignIn,
  auth.isAdmin,
  publishersValidator.createPublisher,
  publishersController.createPublisher
);

/**
 * @swagger
 * /api/publishers:
 *   get:
 *     summary: Get Publishers
 *     tags: [Publishers]
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
 */
router.get(
  "/",
  rateLimiters.common,
  publishersValidator.getPublishers,
  publishersController.getPublishers
);

/**
 * @swagger
 * /api/publishers/{publisherID}:
 *   get:
 *     summary: Get Publisher by ID
 *     tags: [Publishers]
 *     parameters:
 *       - in: path
 *         name: publisherID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get(
  "/:publisherID",
  rateLimiters.common,
  publishersValidator.getPublisherByID,
  publishersController.getPublisherByID
);

/**
 * @swagger
 * /api/publishers/{publisherID}:
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
 */
router.put(
  "/:publisherID",
  rateLimiters.database,
  auth.isSignIn,
  auth.isAdmin,
  publishersValidator.updatePublisher,
  publishersController.updatePublisher
);

/**
 * @swagger
 * /api/publishers/{publisherID}:
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
router.delete(
  "/:publisherID",
  rateLimiters.database,
  auth.isSignIn,
  auth.isAdmin,
  publishersValidator.deletePublisher,
  publishersController.deletePublisher
);

export default router;

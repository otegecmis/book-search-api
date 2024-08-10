import express from "express";

import authorsController from "../controllers/authors.controller.js";
import authorsValidator from "../validators/authors.validator.js";

import rateLimiters from "../middleware/rate-limit.middleware.js";
import authCheck from "../middleware/auth-check.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Create Author
 *     description: Only authorized users can access this endpoint.
 *     tags: [Authors]
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
 *               name: J. K. Rowling
 *               country: England
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  "/",
  rateLimiters.database,
  authCheck.isSignIn,
  authCheck.isAdmin,
  authorsValidator.createAuthor,
  authorsController.createAuthor
);

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Get Authors
 *     tags: [Authors]
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
router.get("/", rateLimiters.common, authorsValidator.getAuthors, authorsController.getAuthors);

/**
 * @swagger
 * /api/authors/{authorID}:
 *   get:
 *     summary: Get Author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: authorID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get(
  "/:authorID",
  rateLimiters.common,
  authorsValidator.getAuthorByID,
  authorsController.getAuthorByID
);

/**
 * @swagger
 * /api/authors/{authorID}:
 *   put:
 *     summary: Update Author
 *     description: Only authorized users can access this endpoint.
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: authorID
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
 *               name: J.R.R. Tolkien
 *               country: United Kingdom
 *     responses:
 *       200:
 *         description: OK
 */
router.put(
  "/:authorID",
  rateLimiters.database,
  authCheck.isSignIn,
  authCheck.isAdmin,
  authorsValidator.updateAuthor,
  authorsController.updateAuthor
);

/**
 * @swagger
 * /api/authors/{authorID}:
 *   delete:
 *     summary: Delete Author
 *     description: Only authorized users can access this endpoint.
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: authorID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content
 */
router.delete(
  "/:authorID",
  rateLimiters.database,
  authCheck.isSignIn,
  authCheck.isAdmin,
  authorsValidator.deleteAuthor,
  authorsController.deleteAuthor
);

export default router;

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
 *   get:
 *     summary: Get Authors
 *     tags: [Authors]
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
 * /api/authors/{authorID}:
 *   get:
 *     summary: Get Author by ID
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
 *       200:
 *         description: OK
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
import express from "express";

import authorsController from "../controllers/authors.controller.js";
import authorsValidator from "../validators/authors.validator.js";

import rateLimiters from "../middleware/rate-limit.middleware.js";
import authCheck from "../middleware/auth-check.middleware.js";

const router = express.Router();

router
  .post(
    "/",
    rateLimiters.database,
    authCheck.isSignIn,
    authCheck.isAdmin,
    authorsValidator.createAuthor,
    authorsController.createAuthor
  )
  .get(
    "/",
    rateLimiters.common,
    authCheck.isSignIn,
    authorsValidator.getAuthors,
    authorsController.getAuthors
  )
  .get(
    "/:authorID",
    rateLimiters.common,
    authCheck.isSignIn,
    authorsValidator.getAuthorByID,
    authorsController.getAuthorByID
  )
  .put(
    "/:authorID",
    rateLimiters.database,
    authCheck.isSignIn,
    authCheck.isAdmin,
    authorsValidator.updateAuthor,
    authorsController.updateAuthor
  )
  .delete(
    "/:authorID",
    rateLimiters.database,
    authCheck.isSignIn,
    authCheck.isAdmin,
    authorsValidator.deleteAuthor,
    authorsController.deleteAuthor
  );

export default router;

import express from "express";

import booksController from "../controllers/books.controller.js";
import booksValidator from "../validators/books.validator.js";

import rateLimiters from "../middleware/rate-limit.middleware.js";
import authCheck from "../middleware/auth-check.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create Book
 *     description: Only authorized users can access this endpoint.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               authorID:
 *                 type: integer
 *               image:
 *                 type: string
 *               publisherID:
 *                 type: integer
 *               published:
 *                 type: string
 *               isbn13:
 *                 type: string
 *               isbn10:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               title: Harry Potter and the Philosopher's Stone
 *               authorID: 1
 *               image: https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg
 *               publisherID: 1
 *               published: "1997"
 *               isbn13: "9780747532699"
 *               isbn10: "0747532699"
 *               status: active
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  "/",
  rateLimiters.database,
  authCheck.isSignIn,
  authCheck.isAdmin,
  booksValidator.createBook,
  booksController.createBook
);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get Books
 *     tags: [Books]
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
router.get("/", rateLimiters.common, booksValidator.getBooks, booksController.getBooks);

/**
 * @swagger
 * /api/books/{bookID}:
 *   get:
 *     summary: Get Book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get(
  "/:bookID",
  rateLimiters.common,
  booksValidator.getBookByID,
  booksController.getBookByID
);

/**
 * @swagger
 * /api/books/search/{isbn}:
 *   get:
 *     summary: Get Book by ISBN
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get(
  "/search/:isbn",
  rateLimiters.common,
  booksValidator.getBookByISBN,
  booksController.getBookByISBN
);

/**
 * @swagger
 * /api/books/{bookID}:
 *   put:
 *     summary: Update Book by ID
 *     description: Only authorized users can access this endpoint.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookID
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               authorID:
 *                 type: integer
 *               image:
 *                 type: string
 *               publisherID:
 *                 type: integer
 *               published:
 *                 type: string
 *               isbn13:
 *                 type: string
 *               isbn10:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               title: "The Lord of the Rings: The Fellowship of the Ring"
 *               authorID: 1
 *               image: https://harpercollins.co.uk/cdn/shop/files/x9780008537722.jpg
 *               publisherID: 1
 *               published: "2012"
 *               isbn13: "9780008537722"
 *               isbn10: "0008537720"
 *               status: active
 *     responses:
 *       200:
 *         description: OK
 */
router.put(
  "/:bookID",
  rateLimiters.database,
  authCheck.isSignIn,
  authCheck.isAdmin,
  booksValidator.updateBook,
  booksController.updateBook
);

/**
 * @swagger
 * /api/books/{bookID}:
 *   delete:
 *     summary: Delete Book by ID
 *     description: Only authorized users can access this endpoint.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content
 */
router.delete(
  "/:bookID",
  rateLimiters.database,
  authCheck.isSignIn,
  authCheck.isAdmin,
  booksValidator.deleteBook,
  booksController.deleteBook
);

export default router;

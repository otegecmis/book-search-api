import express from "express";

import usersController from "../controllers/users.controller.js";
import usersValidator from "../validators/users.validator.js";

import rateLimiters from "../middleware/rate-limit.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/users/{userID}:
 *   get:
 *     summary: Get User by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/:userID", rateLimiters.common, usersValidator.getUser, usersController.getUser);

export default router;

import express from "express";

import usersController from "../controllers/users.controller.js";
import usersValidator from "../validators/users.validator.js";

import authCheck from "../middleware/auth-check.middleware.js";
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

/**
 * @swagger
 * /api/users/{userID}:
 *   put:
 *     summary: Update User Information by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
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
 *               surname:
 *                 type: string
 *             example:
 *               name: "John"
 *               surname: "Doe"
 *     responses:
 *       200:
 *         description: OK
 */
router.put(
  "/:userID",
  rateLimiters.database,
  authCheck.isSignIn,
  usersValidator.updateUser,
  usersController.updateUser
);

/**
 * @swagger
 * /api/users/{userID}/email:
 *   put:
 *     summary: Update User Email by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
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
 *               oldEmail:
 *                 type: string
 *               newEmail:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               oldEmail: "namesurname@domain.com"
 *               newEmail: "name@domain.com"
 *               password: "123456"
 */
router.put(
  "/:userID/email",
  rateLimiters.database,
  authCheck.isSignIn,
  usersValidator.updateEmail,
  usersController.updateEmail
);

/**
 * @swagger
 * /api/users/{userID}/password:
 *   put:
 *     summary: Update User Password by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
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
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             example:
 *               oldPassword: "123456"
 *               newPassword: "987654"
 */
router.put(
  "/:userID/password",
  rateLimiters.database,
  authCheck.isSignIn,
  usersValidator.updatePassword,
  usersController.updatePassword
);

/**
 * @swagger
 * /api/users/{userID}:
 *   delete:
 *     summary: Deactivate User by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
router.delete(
  "/:userID",
  rateLimiters.database,
  authCheck.isSignIn,
  usersValidator.deactivateUser,
  usersController.deactivateUser
);

export default router;

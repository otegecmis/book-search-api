/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Sign up
 *     tags: [Auth]
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: "Name"
 *               surname: "Surname"
 *               email: "namesurname@domain.com"
 *               password: "123456"
 *     responses:
 *       201:
 *         description: Created
 * /api/auth/signin:
 *   post:
 *     summary: Sign in
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "namesurname@domain.com"
 *               password: "123456"
 *     responses:
 *       200:
 *         description: OK
 * /api/auth/activate:
 *   put:
 *     summary: Activate account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "namesurname@domain.com"
 *               password: "123456"
 *     responses:
 *       200:
 *         description: OK
 * /api/auth/refresh:
 *   put:
 *     summary: Refresh tokens
 *     description: Refresh the access token using the refresh token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: ""
 *     responses:
 *       200:
 *         description: OK
 * /api/auth/signout:
 *   delete:
 *     summary: Sign out
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: ""
 *     responses:
 *       200:
 *         description: OK
 */
import express from "express";

import authController from "../controllers/auth.controller.js";
import authValidator from "../validators/auth.validator.js";

import rateLimiters from "../middleware/rate-limit.middleware.js";

const router = express.Router();

router
  .post("/signup", rateLimiters.auth, authValidator.signup, authController.signup)
  .post("/signin", rateLimiters.auth, authValidator.signin, authController.signin)
  .put("/activate", rateLimiters.auth, authValidator.activate, authController.activate)
  .put("/refresh", rateLimiters.auth, authValidator.refresh, authController.refresh)
  .delete("/signout", rateLimiters.auth, authValidator.signout, authController.signout);

export default router;

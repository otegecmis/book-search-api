import express from "express";

import indexController from "../controllers/index.controller.js";

import swaggerRoutes from "./swagger.routes.js";

const router = express.Router();

router.get("/", indexController.welcomePage);
router.use("/swagger", swaggerRoutes);

export default router;

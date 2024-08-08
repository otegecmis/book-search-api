import express from "express";

import config from "../config/index.config.js";
import { serve, setup } from "../config/swagger.config.js";

const router = express.Router();

if (config.server.node_env === "development") {
  router.use("/", serve, setup);
}

export default router;

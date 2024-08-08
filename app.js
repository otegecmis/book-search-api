import express from "express";

import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import createError from "http-errors";

import config from "./config/index.config.js";
import routes from "./routes/index.routes.js";

const app = express();

app
  .use(
    cors({
      origin: config.server.origin,
    })
  )
  .use(helmet())
  .use(express.json())
  .use(compression());

app
  .use("/api", routes)
  .use((req, res, next) => {
    next(createError.NotFound("The page you're looking for doesn't exist."));
  })
  .use((error, req, res, next) => {
    const errorStatus = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";

    res.status(errorStatus).json({
      result: {
        message: errorMessage,
      },
    });

    next();
  });

export default app;

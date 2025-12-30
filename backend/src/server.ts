import config from "@/config";
import cors, { CorsOptions } from "cors";
import express, { type Request, type Response } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import ExpressRateLimit from "@/lib/express_rate_limit";
import { logger } from "./lib/winston";

const app = express();

const corsOptions: CorsOptions = {
  credentials: true,
  origin(origin, callback) {
    // Allow non-browser requests (Postman, curl, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    // Development: allow everything
    if (config.NODE_ENV === "development") {
      return callback(null, true);
    }

    // Production: allow only whitelisted origins
    if (config.ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    callback(
      new Error(`CORS Error: ${origin} is not allowed by CORS`),
      false
    )
    logger.warn(`CORS Error: ${origin} is not allowed by CORS`);
  },
};
app.set("trust proxy", 1);

app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  compression({
    threshold: 1024,
  })
);

app.use(ExpressRateLimit);






export default app;

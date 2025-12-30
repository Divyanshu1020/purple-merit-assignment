import dotenv from "dotenv";
import type ms from "ms";
dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "",
  ALLOWED_ORIGINS: [] as string[],
  MONGODB_URI: process.env.MONGODB_URI || "",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN as ms.StringValue,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN as ms.StringValue,
} as const;

export default config;

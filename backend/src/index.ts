import config from "@/config";
import app from "@/server";
import { type Request, type Response } from "express";
import v1Router from "./routes/v1";
import { connectDB, disconnectDB } from "@/lib/mongoos";
import { logger } from "./lib/winston";

(async () => {
  try {

    await connectDB();

    app.use("/api/v1", v1Router);

    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    logger.error("Error starting server", error);

    if (config.NODE_ENV === "production") {
      process.exit(1);
    }
  }
})();

const handleServerShutdown =  async () => {
  try {
    await disconnectDB();
    logger.info("Shutting down server");
    process.exit(0);
  } catch (error) {
    logger.error("Error shutting down server", error);
  }
}

process.on("SIGINT", handleServerShutdown);
process.on("SIGTERM", handleServerShutdown);

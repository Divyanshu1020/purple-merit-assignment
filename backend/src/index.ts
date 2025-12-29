import config from "@/config";
import app from "@/server";
import { type Request, type Response } from "express";

(async () => {
  try {
    app.listen(config.PORT, () => {});
  } catch (error) {
    if (config.NODE_ENV === "production") {
      process.exit(1);
    }
  }
})();

const handleServerShutdown = async () => {
  try {
    process.exit(0);
  } catch (error) {}
};

process.on("SIGINT", handleServerShutdown);
process.on("SIGTERM", handleServerShutdown);

import config from "@/config";
import mongoose, { type ConnectOptions } from "mongoose";
import { logger } from "./winston";

const clientOptions: ConnectOptions = {
  dbName: "purple-merit",
  appName: "Cluster0",
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

export const connectDB = async (): Promise<void> => {
  if (!config.MONGODB_URI) {
    throw new Error("Please provide a valid MongoDB URI");
  }

  try {
    await mongoose.connect(config.MONGODB_URI, clientOptions);
    logger.info(`Connected to the database successfully`, {
      uri: config.MONGODB_URI,
      db: clientOptions.dbName,
      appName: clientOptions.appName,
      options: clientOptions,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    logger.error(`MongoDB connection error: ${error}`);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info("Disconnected from the database", {
      uri: config.MONGODB_URI,
      db: clientOptions.dbName,
      appName: clientOptions.appName,
      options: clientOptions,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    logger.error(`MongoDB error Disconnecting: ${error}`);
  }
};

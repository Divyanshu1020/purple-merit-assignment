import jwt from "jsonwebtoken";

import config from "@/config";
import { Types } from "mongoose";

export const generateAccessToken = (userId: Types.ObjectId, role: string): string => {
  return jwt.sign({ userId, role }, config.JWT_ACCESS_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const generateRefreshToken = (userId: Types.ObjectId, role: string): string => {
  return jwt.sign({ userId, role }, config.JWT_REFRESH_SECRET, {
    expiresIn: config.REFRESH_TOKEN_EXPIRES_IN,
    subject: "refreshApi",
  });
};

export const verifyRefreshToken = (refreshToken: string) => {
  return jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
};

export const verifyAccessToken = (accessToken: string) => {
  return jwt.verify(accessToken, config.JWT_ACCESS_SECRET);
};

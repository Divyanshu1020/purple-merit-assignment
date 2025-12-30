import { verifyAccessToken } from "@/lib/jwt";

import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Types } from "mongoose";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({
      message: "Unauthorized: No authorization header found",
      status: "error",
      version: "1.0.0",
    });
    return;
  }

  if (!authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Unauthorized: Invalid authorization header format",
      status: "error",
      version: "1.0.0",
    });
    return;
  }

  try {
    const token = authHeader.split(" ")[1] as string;
    const JWT_Payload = verifyAccessToken(token) as {
      userId: Types.ObjectId;
    };

    req.userId = JWT_Payload.userId;

    return next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        message: "Unauthorized: Invalid access token",
        status: "error",
        version: "1.0.0",
      });
      return;
    }
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        message: "Unauthorized: Access token expired",
        status: "error",
        version: "1.0.0",
      });
      return;
    }
    res.status(500).json({
      message: "Internal server error",
      status: "error",
      version: "1.0.0",
    });
    return;
  }
};

export default authenticate;

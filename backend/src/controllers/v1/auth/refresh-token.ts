import config from "@/config";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/lib/jwt";
import { logger } from "@/lib/winston";
import TokenModel from "@/models/token";
import UserModel from "@/models/user";
import { Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Types } from "mongoose";

const refreshTokenController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const refreshToken = req.cookies.refreshToken as string;
  if (!refreshToken) {
    res.status(401).json({
      message: "Unauthorized: No refresh token found",
      status: "error",
      version: "1.0.0",
    });
    return;
  }
  try {
    const tokenExists = await TokenModel.exists({ refreshToken });
    if (!tokenExists) {
      res.status(401).json({
        message: "Unauthorized: Invalid refresh token",
        status: "error",
        version: "1.0.0",
      });
      return;
    }
    const JWT_Payload = verifyRefreshToken(refreshToken) as {
      userId: Types.ObjectId;
      role: string
    };

    // const user = await UserModel.findById(JWT_Payload.userId);
    // if (!user) {
    //   res.status(401).json({
    //     message: "Unauthorized: User not found",
    //     status: "error",
    //     version: "1.0.0",
    //   });
    //   return;
    // }

    const accessToken = generateAccessToken(JWT_Payload.userId, JWT_Payload.role);
    // const newRefreshToken = generateRefreshToken(JWT_Payload.userId);

    // await TokenModel.updateOne({ refreshToken }, { refreshToken: newRefreshToken });

    // res.cookie("refreshToken", newRefreshToken, {
    //   httpOnly: true,
    //   secure: config.NODE_ENV === "production",
    //   sameSite: "strict",
    // });



    res.status(200).json({
      message: "Refresh token generated successfully",
      data: {
        accessToken,
      },
      status: "success",
      version: "1.0.0",
    });
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        message: "Unauthorized: Refresh token expired",
        status: "error",
        version: "1.0.0",
      });
      return;
    }
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        message: "Unauthorized: Invalid refresh token",
        status: "error",
        version: "1.0.0",
      });
      return;
    }
    res.status(500).json({
      message: "Internal server error",
      status: "error",
      version: "1.0.0",
      error: error,
    });
    logger.error("Error refreshing token", error);
  }
};

export default refreshTokenController;

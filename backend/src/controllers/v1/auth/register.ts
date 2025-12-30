import { logger } from "@/lib/winston";

import config from "@/config";

import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import UserModel, { TUser } from "@/models/user";
import { Request, Response } from "express";
import TokenModel from "@/models/token";

const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, fullName } = req.body as TUser;

  try {
    const newUser = await UserModel.create({
      email,
      password,
      fullName,
    });
    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);

    await TokenModel.create({
        refreshToken,
        userId: newUser._id,
    })

    // Remove password from response
    const userResponse = newUser.toObject();
    // @ts-ignore
    delete userResponse.password;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).json({
      message: "User registered successfully",
      data: {
        user: userResponse,
        accessToken,
      },
      status: "success",
      version: "1.0.0",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: "error",
      version: "1.0.0",
      error: error,
    });
    logger.error("Error registering user", error);
  }
};

export default register;

import config from "@/config";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { logger } from "@/lib/winston";
import TokenModel from "@/models/token";
import UserModel, { TUser } from "@/models/user";
import { Request, Response } from "express";

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as TUser;
  try {
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({
        message: "Invalid credentials",
        status: "error",
        version: "1.0.0",
      });
      return;
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Invalid credentials",
        status: "error",
        version: "1.0.0",
      });
      return;
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await TokenModel.findOneAndUpdate(
      { userId: user._id },
      { refreshToken },
      { upsert: true }
    );

    await UserModel.updateOne(
      { _id: user._id },
      { $set: { loginTimestamp: new Date() } }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Remove password from response
    const userResponse = user.toObject();
    // @ts-ignore
    delete userResponse.password;

    res.status(200).json({
      message: "User logged in successfully",
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
    logger.error("Error logging in user", error);
  }
};

export default login;

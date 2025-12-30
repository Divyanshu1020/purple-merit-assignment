import { logger } from "@/lib/winston";
import UserModel from "@/models/user";
import { Request, Response } from "express";

const changePassword = async (req: Request, res: Response): Promise<void> => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400).json({
      message: "Current password and new password are required",
      status: "error",
      version: "1.0.0",
    });
    return;
  }

  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      res.status(404).json({
        message: "User not found",
        status: "error",
        version: "1.0.0",
      });
      return;
    }

    const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);

    if (!isPasswordCorrect) {
      res.status(401).json({
        message: "Invalid current password",
        status: "error",
        version: "1.0.0",
      });
      return;
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
      status: "success",
      version: "1.0.0",
    });
  } catch (error) {
    logger.error("Error changing password", error);
    res.status(500).json({
      message: "Internal server error",
      status: "error",
      version: "1.0.0",
    });
  }
};

export default changePassword;

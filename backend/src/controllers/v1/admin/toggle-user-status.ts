import { logger } from "@/lib/winston";
import UserModel from "@/models/user";
import { Request, Response } from "express";

const toggleUserStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        message: "User ID is required",
        status: "error",
        version: "1.0.0",
      });
      return;
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      [
        {
          $set: {
            status: {
              $cond: [{ $eq: ["$status", "active"] }, "inactive", "active"],
            },
          },
        },
      ],
      { new: true }
    );

    if (!user) {
      res.status(404).json({
        message: "User not found",
        status: "error",
        version: "1.0.0",
      });
      return;
    }

    res.status(200).json({
      message: `User ${
        user.status === "active" ? "activated" : "deactivated"
      } successfully`,
      data: {
        user,
      },
      status: "success",
      version: "1.0.0",
    });
  } catch (error) {
    logger.error("Error toggling user status", error);
    res.status(500).json({
      message: "Internal server error",
      status: "error",
      version: "1.0.0",
    });
  }
};

export default toggleUserStatus;

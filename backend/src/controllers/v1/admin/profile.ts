import { logger } from "@/lib/winston";
import UserModel from "@/models/user";
import { Request, Response } from "express";

const profile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserModel.findById(req.userId).select(
      "-password -status -__v -loginTimestamp"
    );
    if (!user) {
      res.status(404).json({
        message: "User not found",
        status: "error",
      });
      return;
    }
    res.status(200).json({
      message: "User profile fetched successfully",
      data: {
        user,
      },
      status: "success",
    });
  } catch (error) {
    logger.error("Error fetching user profile", error);
    res.status(500).json({
      message: "Internal server error",
      status: "error",
    });
  }
};

export default profile;

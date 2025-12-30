import { logger } from "@/lib/winston";
import UserModel from "@/models/user";
import { Request, Response } from "express";

const updateProfile = async (req: Request, res: Response): Promise<void> => {
  const { fullName, email } = req.body;

  try {
    const user = await UserModel.findById(req.userId).select(
      "-password -status -__v -loginTimestamp"
    );

    if (!user) {
      res.status(404).json({
        message: "User not found",
        status: "error",
        version: "1.0.0",
      });
      return;
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;

    await user.save();

    const updatedUser = user.toObject();
    // @ts-ignore
    delete updatedUser.password;
    // @ts-ignore
    delete updatedUser.__v;

    res.status(200).json({
      message: "Profile updated successfully",
      data: {
        user: updatedUser,
      },
      status: "success",
      version: "1.0.0",
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(409).json({
        message: "Email already exists",
        status: "error",
        version: "1.0.0",
      });
      return;
    }
    logger.error("Error updating user profile", error);
    res.status(500).json({
      message: "Internal server error",
      status: "error",
      version: "1.0.0",
    });
  }
};

export default updateProfile;

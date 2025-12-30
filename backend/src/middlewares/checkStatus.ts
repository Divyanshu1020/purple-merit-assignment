import UserModel from "@/models/user";
import { NextFunction, Request, Response } from "express";

const checkStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user;

    const userId = req.userId;

    if (userId) {
      user = await UserModel.findById(userId);
    }
    // If not authenticated, check body for email (e.g. login route)
    else if (req.body.email) {
      user = await UserModel.findOne({ email: req.body.email });
    }

    // If user is found, check status
    if (user) {
      if (user.status !== "active") {
        res.status(403).json({
          message: "Your account is inactive. Please contact support.",
          status: "error",
          version: "1.0.0",
        });
        return;
      }
    }

    // If authenticated (token valid) but user not found in DB -> 404
    // This handles the case where a user is deleted but sends a valid (previously issued) token.
    if (userId && !user) {
      res.status(404).json({
        message: "User not found",
        status: "error",
        version: "1.0.0",
      });
      return;
    }

    next();
  } catch (error) {
    console.error("Error in checkStatus middleware:", error);
    res.status(500).json({
      message: "Internal server error",
      status: "error",
      version: "1.0.0",
    });
    return;
  }
};

export default checkStatus;

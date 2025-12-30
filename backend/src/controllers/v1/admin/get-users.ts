import { logger } from "@/lib/winston";
import UserModel from "@/models/user";
import { Request, Response } from "express";

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Optional filters
    const status = req.query.status as string;
    const role = req.query.role as string;
    const search = req.query.search as string;

    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: "i" } },
        { fullName: { $regex: search, $options: "i" } },
      ];
    }

    const [users, totalUsers] = await Promise.all([
      UserModel.find(query)
        .select("-password -__v")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      UserModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      message: "Users fetched successfully",
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers,
          limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
      status: "success",
      version: "1.0.0",
    });
  } catch (error) {
    logger.error("Error fetching users", error);
    res.status(500).json({
      message: "Internal server error",
      status: "error",
      version: "1.0.0",
    });
  }
};

export default getUsers;

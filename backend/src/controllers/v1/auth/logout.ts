import config from "@/config";
import TokenModel from "@/models/token";
import { Request, Response } from "express";

const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            await TokenModel.deleteOne({ refreshToken });
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: config.NODE_ENV === "production",
                sameSite: "strict",
            });
        }
        res.status(200).json({
            message: "Logout successful",
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
    }
}

export default logout;

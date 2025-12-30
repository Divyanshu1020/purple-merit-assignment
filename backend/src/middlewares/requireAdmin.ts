import { NextFunction, Request, Response } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.role !== "admin") {
        res.status(401).json({
            message: "Unauthorized: User is not an admin",
            status: "error",
            version: "1.0.0",
        });
        return;
    }
    return next();
}

export default isAdmin;

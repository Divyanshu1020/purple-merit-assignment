import express from "express";
import authRouter from "./auth";
import userRouter from "./user";
import adminRouter from "./admin";
const router = express.Router();

router.get("/HelloWorld", (req, res) => {
    res.status(200).json({
        message: "Hello World!",
        status: "success",
        version: "1.0.0",
    });
});

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);

export default router;
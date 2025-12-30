import express from "express";
import authRouter from "./auth";

const router = express.Router();

router.get("/HelloWorld", (req, res) => {
    res.status(200).json({
        message: "Hello World!",
        status: "success",
        version: "1.0.0",
    });
});

router.use("/auth", authRouter);

export default router;
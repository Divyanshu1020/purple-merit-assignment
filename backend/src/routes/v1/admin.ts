import profile from "@/controllers/v1/user/profile";
import authenticateJWT from "@/middlewares/authenticateJWT";
import { Router } from "express";

const router = Router();

router.post("/profile", authenticateJWT, profile);

export default router;

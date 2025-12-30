import login from "@/controllers/v1/auth/login";
import logout from "@/controllers/v1/auth/logout";
import refreshTokenController from "@/controllers/v1/auth/refresh-token";
import register from "@/controllers/v1/auth/register";
import authenticateJWT from "@/middlewares/authenticateJWT";
import checkStatus from "@/middlewares/checkStatus";
import {
  validateLogin,
  validateRefreshToken,
  validateRegister,
} from "@/middlewares/zod/validation";
import { Router } from "express";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, checkStatus, login);
router.post("/refresh-token", validateRefreshToken, refreshTokenController);
router.post("/logout", authenticateJWT, logout);

export default router;

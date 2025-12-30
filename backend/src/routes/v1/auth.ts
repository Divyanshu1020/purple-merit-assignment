import login from "@/controllers/v1/auth/login";
import logout from "@/controllers/v1/auth/logout";
import refreshTokenController from "@/controllers/v1/auth/refresh-token";
import register from "@/controllers/v1/auth/register";
import {
  validateLogin,
  validateRefreshToken,
  validateRegister,
} from "@/middlewares/auth/validation";
import authenticate from "@/middlewares/authenticate";
import { Router } from "express";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/refresh-token", validateRefreshToken, refreshTokenController);
router.post("/logout", authenticate, logout);

export default router;
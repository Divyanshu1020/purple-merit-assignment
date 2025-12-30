import login from "@/controllers/v1/auth/login";
import refreshTokenController from "@/controllers/v1/auth/refresh-token";
import register from "@/controllers/v1/auth/register";
import logout from "@/controllers/v1/auth/logout";
import {Router} from "express";
import authenticate from "@/middlewares/authenticate";


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshTokenController);
router.post("/logout", authenticate, logout);

export default router;
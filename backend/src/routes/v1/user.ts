import changePassword from "@/controllers/v1/user/change-password";
import profile from "@/controllers/v1/user/profile";
import updateProfile from "@/controllers/v1/user/update-profile";
import authenticateJWT from "@/middlewares/authenticateJWT";
import checkStatus from "@/middlewares/checkStatus";
import {
  validateChangePassword,
  validateUpdateProfile,
} from "@/middlewares/zod/validation";
import { Router } from "express";

const router = Router();

router.use(authenticateJWT, checkStatus);

router.get("/profile", profile);
router.patch("/profile", validateUpdateProfile, updateProfile);
router.patch("/change-password", validateChangePassword, changePassword);

export default router;

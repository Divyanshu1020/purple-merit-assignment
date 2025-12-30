import getUsers from "@/controllers/v1/admin/get-users";
import toggleUserStatus from "@/controllers/v1/admin/toggle-user-status";
import profile from "@/controllers/v1/user/profile";
import authenticateJWT from "@/middlewares/authenticateJWT";
import { Router } from "express";

const router = Router();

router.post("/profile", authenticateJWT, profile);
router.post("/get-users", authenticateJWT, getUsers);
router.post("/toggle-user-status/:userId", authenticateJWT, toggleUserStatus);

export default router;

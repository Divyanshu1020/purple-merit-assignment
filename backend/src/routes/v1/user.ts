import profile from "@/controllers/v1/admin/profile";
import authenticateJWT from "@/middlewares/authenticateJWT";
import { Router } from "express";
import requireAdmin from "@/middlewares/requireAdmin";

const router = Router();

router.use(authenticateJWT, requireAdmin)

router.post("/profile", profile);

export default router;

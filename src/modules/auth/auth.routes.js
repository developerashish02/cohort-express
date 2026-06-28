import { Router } from "express";
import * as controller from "./auth.controller.js";
import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";
import LoginDto from "./dto/login.dto.js";
import VerifyDto from "./dto/verify.dto.js";
import ForgotPasswordDto from "./dto/forgot-password.dto.js";
import { authMiddleware } from "./auth.middleware.js";

const router = new Router();

router.post("/register", validate(RegisterDto), controller.registerUser);
router.post("/login", validate(LoginDto), controller.loginUser);
router.post("/verify", validate(VerifyDto), controller.verifyUser);
router.get("/profile", authMiddleware, controller.getMe);
router.post("/logout", authMiddleware, controller.logoutUser);
router.post("/forgot-password", validate(ForgotPasswordDto), controller.forgotPassword)

export default router;
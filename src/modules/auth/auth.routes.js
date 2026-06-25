import { Router } from "express";
import * as controller from "./auth.controller.js";
import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";
import VerifyUser from "./dto/verify.dto.js";

const router = new Router();

router.post("/register", validate(RegisterDto), controller.registerUser);
router.post("/verify", validate(VerifyUser), controller.verifyUser);

export default router;
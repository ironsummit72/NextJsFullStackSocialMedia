import { Router } from "express";
import { handleLogin, handleRegister } from "../controller/auth.controller";
const router = Router();

router.post("/register", handleLogin);
router.post("/login", handleRegister);

export default router;

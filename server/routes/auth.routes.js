import { Router } from "express";
import { logIn, logOut, register } from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/auth.js";

const router = Router();

// POST /api/auth/register: Register a new user.
router.post("/register", register);
// POST /api/auth/login: Log in an existing user and provide a JWT token.
router.post("/login", logIn);
// GET /api/auth/logout: Log out the user.
router.get("/logout", isAuth, logOut);

export default router;

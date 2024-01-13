import { Router } from "express";

const router = Router();

// POST /api/auth/register: Register a new user.
router.post("/register", register);
// POST /api/auth/login: Log in an existing user and provide a JWT token.
router.post("/login", logIn);
// GET /api/auth/logout: Log out the user.
router.get("/profile", logOut);

export default router;

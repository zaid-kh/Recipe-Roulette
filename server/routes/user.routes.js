import { Router } from "express";
const router = Router();

// GET /api/v1/users: Retrieve a list of all users.
router.get("/", getAllUsers);

// GET /api/v1/users/:id: Retrieve details of a specific user.
router.get("/:id", getUserById);

//! POST /api/users: Add a new user to the database (testing-only).
router.post("/", createUser);

// PUT /api/users/:id: Update details of a specific user (admin-only).
// Requires authentication.
router.put("/:id", isAuth, updateUser);

// DELETE /api/users/:id: Delete a user from the database (admin-only).
// Requires authentication and admin privileges.
router.delete("/:id", isAdmin, deleteUser);

export default router;

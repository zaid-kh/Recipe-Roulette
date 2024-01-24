import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  getFavoriteRecipes,
  addFavoriteRecipe,
} from "../controllers/user.controller.js";
import { isAdmin, isAuth } from "../middlewares/auth.js";
const router = Router();

// GET /api/v1/users: Retrieve a list of all users.
router.get("/", isAuth, getAllUsers);

// GET /api/v1/users/:id: Retrieve details of a specific user.
router.get("/:id", getUserById);

// GET /api/v1/users/:id/favorites: Retrieve a list of a user's favorite recipes.
router.get("/:id/favorites", getFavoriteRecipes);

// PUT /api/users/favorite/:recipeID: Add a recipe to the user's favorites.
// Requires authentication.
router.put("/favorite/:recipeId", isAuth, addFavoriteRecipe);

//! POST /api/users: Add a new user to the database (testing-only).
router.post("/", createUser);

// PUT /api/users/:id: Update details of a specific user (admin-only).
// Requires authentication.
// router.put("/:id", isAuth, updateUser);

// DELETE /api/users/:id: Delete a user from the database (admin-only).
// Requires authentication and admin privileges.
// router.delete("/:id", isAdmin, deleteUser);

export default router;

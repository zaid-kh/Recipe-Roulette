import { Router } from "express";
import {
  createRecipe,
  deleteRecipe,
  findRecipes,
  getAllRecipes,
  getRecipeById,
  rateRecipe,
  reviewRecipe,
  surpriseMe,
  updateRecipe,
} from "../controllers/recipe.controller.js";
import { isAdmin, isAuth } from "../middlewares/auth.js";
const router = Router();
// POST /api/recipes/findRecipes Find recipes that match the given criteria.
router.post("/findRecipes", findRecipes);

// POST /api/recipes/surprise: Get a random recipe.
router.post("/surprise", surpriseMe);

// GET /api/v1/recipes: Retrieve a list of all recipes.
router.get("/", getAllRecipes);

// POST /api/recipes/favorite: Add a recipe to the user's favorites.
// Requires authentication.
// !router.post("/favorite", isAuth, favoriteRecipe);

// GET /api/v1/recipes/:id: Retrieve details of a specific recipe.
// router.get("/:id", getRecipeById);

// POST /api/recipes: Add a new recipe to the database (admin-only).
// Requires authentication and admin privileges.
// !router.post("/", isAdmin, createRecipe);

// PUT /api/recipes/:id: Update details of a specific recipe (admin-only).
// Requires authentication and admin privileges.
// !router.put("/:id", isAdmin, updateRecipe);

// DELETE /api/recipes/:id: Delete a recipe from the database (admin-only).
// Requires authentication and admin privileges.
// !router.delete("/:id", isAdmin, deleteRecipe);

// POST /api/recipes/:id/rate: Rate a recipe.
// Requires authentication.
// !router.post("/:id/rate", isAuth, rateRecipe);

// POST /api/recipes/:id/review: Add a review for a recipe.
// Requires authentication.
// !router.post("/:id/review", isAuth, reviewRecipe);

export default router;

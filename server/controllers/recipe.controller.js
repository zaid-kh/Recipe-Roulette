import Recipe from "../models/recipe.schema.js";
import STATUS_CODE from "../constants/statusCodes.js";

export const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.status(STATUS_CODE.OK).json({ recipes });
  } catch (error) {
    next(error);
  }
};

export const getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: "Recipe not found" });
      return;
    }

    res.status(STATUS_CODE.OK).json({ recipe });
  } catch (error) {
    next(error);
  }
};

export const createRecipe = async (req, res, next) => {
  const recipeData = req.body;

  try {
    const newRecipe = await Recipe.create(recipeData);
    res.status(STATUS_CODE.CREATED).json({ recipe: newRecipe });
  } catch (error) {
    next(error);
  }
};

export const updateRecipe = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedRecipe) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: "Recipe not found" });
      return;
    }

    res.status(STATUS_CODE.OK).json({ recipe: updatedRecipe });
  } catch (error) {
    next(error);
  }
};

export const deleteRecipe = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: "Recipe not found" });
      return;
    }

    res.status(STATUS_CODE.OK).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const rateRecipe = async (req, res, next) => {
  const { id } = req.params;
  const { userId, rating } = req.body;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: "Recipe not found" });
      return;
    }
    // todo: implement rating logic here

    res.status(STATUS_CODE.OK).json({ message: "Recipe rated successfully" });
  } catch (error) {
    next(error);
  }
};

export const reviewRecipe = async (req, res, next) => {
  const { id } = req.params;
  const { userId, rating, comment } = req.body;

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: "Recipe not found" });
      return;
    }

    // todo: implement review logic here

    res
      .status(STATUS_CODE.OK)
      .json({ message: "Recipe reviewed successfully" });
  } catch (error) {
    next(error);
  }
};

export const findRecipes = async (req, res, next) => {
  try {
    const { ingredients, dietaryOptions } = req.body;
    console.log("req.body: ", req.body);

    // Validate input
    if (
      !ingredients ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0
    ) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Invalid ingredients input");
    }

    let query = {
      ingredients: {
        // Match recipes that contain all specified ingredients
        $all: ingredients.map((ingredient) => new RegExp(ingredient, "i")),
      },
    };

    if (
      dietaryOptions &&
      Array.isArray(dietaryOptions) &&
      dietaryOptions.length > 0
    ) {
      query.dietaryOptions = {
        $all: dietaryOptions,
      };
    }

    // find recipes matching the query
    const recipes = await Recipe.find(query);

    if (!recipes || recipes.length === 0) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("No recipes found");
    }

    res.status(STATUS_CODE.OK).json({ recipes });
  } catch (error) {
    next(error);
  }
};

export const surpriseMe = async (req, res, next) => {
  try {
    const { ingredients, dietaryOptions } = req.body;
    console.log("req.body: ", req.body);

    // Validate input
    if (
      !ingredients ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0
    ) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Invalid ingredients input");
    }

    let query = {
      ingredients: {
        // Match recipes that contain all specified ingredients
        $all: ingredients.map((ingredient) => new RegExp(ingredient, "i")),
      },
    };

    if (
      dietaryOptions &&
      Array.isArray(dietaryOptions) &&
      dietaryOptions.length > 0
    ) {
      query.dietaryOptions = {
        $all: dietaryOptions,
      };
    }

    // find recipes matching the query
    const recipes = await Recipe.find(query);

    if (!recipes || recipes.length === 0) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("No recipes found");
    }

    // Return a random recipe
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];

    res.status(STATUS_CODE.OK).json({ recipe: randomRecipe });
  } catch (error) {
    next(error);
  }
};

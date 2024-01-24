import STATUS_CODE from "../constants/statusCodes.js";
import User from "../models/user.schema.js";

export const createUser = async (req, res, next) => {
  try {
    const body = req.body;
    // check if username, password and email are provided
    if (!body.username || !body.password || !body.email) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Username, password and email are required");
    }
    // check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });
    if (existingUser) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("User already exists");
    }
    // create new user
    const user = User.create(body);
    res.status(STATUS_CODE.CREATED).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(STATUS_CODE.OK).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      //   err.statusCode = STATUS_CODE.NOT_FOUND;
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("User not found");
    }
    res.status(STATUS_CODE.OK).json(user);
  } catch (error) {
    next(error);
  }
};

export const getFavoriteRecipes = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("favoriteRecipes");
    if (!user) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("User not found");
    }
    res.status(STATUS_CODE.OK).json(user.favoriteRecipes);
  } catch (error) {
    next(error);
  }
};

export const addFavoriteRecipe = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("User not found");
    }
    const recipeId = req.params.recipeId;
    if (!recipeId) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Recipe id is required");
    }
    if (user.favoriteRecipes.includes(recipeId)) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("Recipe already in favorites");
    }
    user.favoriteRecipes.push(recipeId);
    await user.save();
    res.status(STATUS_CODE.OK).json(user);
  } catch (error) {
    next(error);
  }
};

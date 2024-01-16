import STATUS_CODE from "../constants/statusCodes.js";
import User from "../models/user.schema.js";

const createUser = async (req, res, next) => {
  try {
    const body = req.body;
    // check if username, password and email are provided
    if (!body.username || !body.password || !body.email) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: "Username, password and email are required",
      });
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

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(STATUS_CODE.OK).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(STATUS_CODE.NOT_FOUND).json({
        message: "User not found",
      });
    }
    res.status(STATUS_CODE.OK).json(user);
  } catch (error) {
    next(error);
  }
};

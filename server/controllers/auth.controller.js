import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.schema.js";
import STATUS_CODE from "../constants/statusCodes.js";

const saltRounds = 10;

export const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    // check if username, password and email are provided
    if (!username || !password || !email) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Username, password and email are required");
    }
    // check if email exists
    const existsEmail = await User.exists({ email: email });
    if (existsEmail) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error(`email: ${email} already in use!`);
    }
    // check if username exists
    const existsUsername = await User.exists({ username: username });
    if (existsUsername) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error(`username: ${username} already in use!`);
    }
    // hash password
    bcrypt.hash(password, saltRounds).then(async function (hash) {
      // Store hash in password DB.
      // save user
      const newUser = await User.create({
        username,
        email,
        password: hash,
        ...(role && { role }), // Add the role field to the user object if it exists
      });
      newUser.save();
      res.status(STATUS_CODE.CREATED);
      res.end(`${username} registered successfully`);
    });
  } catch (error) {
    next(error);
  }
};

export const logIn = async (req, res, next) => {
  try {
    // check if user exists
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error(`User with email: ${email} does not exist!`);
    }

    // compare password with stored hash
    const passwordResult = await bcrypt.compare(
      password,
      existingUser.password
    );
    // password does not match
    if (!passwordResult) {
      res.status(STATUS_CODE.UNAUTHORIZED);
      throw new Error("Email and password do not match!");
    }
    //* Create access token to the user
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.username,
        role: existingUser.role,
      },
      process.env.SECRET,
      {
        expiresIn: "15m",
      }
    );
    // Successful login
    res.status(STATUS_CODE.OK);
    res.send(token);
  } catch (error) {
    next(error);
  }
};

export const logOut = async (req, res, next) => {
  try {
    // log out user
    // todo: invalidate token

    res.status(STATUS_CODE.OK);
    res.end("Logged out successfully");

    // redirect to login page

    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};

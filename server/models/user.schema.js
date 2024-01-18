import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function (value) {
          // Regular expression to validate email address
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
    favoriteRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;

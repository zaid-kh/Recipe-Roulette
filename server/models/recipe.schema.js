import { Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Dish name is required"],
    },
    ingredients: {
      type: Array,
      required: [true, "Ingredients are required"],
      validate: {
        validator: function (value) {
          return value.length >= 2;
        },
        message: "At least 2 ingredients are required",
      },
    },
    steps: {
      type: String,
      required: [true, "Steps are required"],
    },
    cuisineType: {
      type: String,
      required: [true, "Cuisine type is required"],
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty level is required"],
    },
    dietaryOptions: {
      type: Array,
      default: [],
    },
    imageURL: {
      type: String,
      default: "",
    },
    ratings: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cookingTime: Number,
  },
  { timestamps: true }
);

const Recipe = model("Recipe", recipeSchema);

export default Recipe;

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  CardActions,
  Box,
  Chip,
} from "@mui/material";
import { Favorite, Save as SaveIcon } from "@mui/icons-material";
import theme from "../config/theme";

const RecipeCard = ({ recipe, showSaveButton = false, onSaveClick }) => {
  const handleSaveClick = () => {
    onSaveClick(recipe._id);
  };

  return (
    <Card
      sx={{
        minHeight: 345,
        maxHeight: 500,
        margin: 2,
        backgroundColor: theme.palette.background.alternate,
      }}
    >
      {/* Recipe Image */}
      <img
        src={
          recipe.imageURL ||
          "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
        }
        alt={recipe.name}
        style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
      />

      {/* Recipe Content */}
      <CardContent>
        <Typography variant="h5">{recipe.name}</Typography>
        <Typography variant="subtitle1">
          Cuisine: {recipe.cuisineType}
        </Typography>
        <Typography variant="body2">Difficulty: {recipe.difficulty}</Typography>

        {/* Display Ingredients as Chips */}
        <Box mt={2} display="flex" flexWrap="wrap">
          {recipe.ingredients.map((ingredient, index) => (
            <Chip
              key={index}
              label={ingredient}
              variant="outlined"
              sx={{ margin: 0.5 }}
            />
          ))}
        </Box>
      </CardContent>

      {/* Recipe Actions */}
      <CardActions>
        {/* Optional Save Button */}
        {showSaveButton && (
          <IconButton onClick={handleSaveClick}>
            Add to favorites
            <Favorite />
          </IconButton>
        )}

        {/* Add more optional buttons/icons as needed */}
      </CardActions>
    </Card>
  );
};

export default RecipeCard;

import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  styled,
  Chip,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import theme from "../../config/theme";
import axios from "axios";
import RecipeCard from "../../components/RecipeCard";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const IngredientsPageContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "normal",
  padding: theme.spacing(2),
}));

const ChipWrapper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: 300,
  width: "40%",
  backgroundColor: theme.palette.background.alternate,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const predefinedDietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Nut-Free",
  "Low-Carb",
  "High-Protein",
];

const IngredientsPage = ({ navbarHeight }) => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [dietaryOptions, setdietaryOptions] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [results, setResults] = useState([]); // results from backend
  const navigate = useNavigate();

  const handleAddOption = () => {
    if (selectedOption && !dietaryOptions.includes(selectedOption)) {
      setdietaryOptions([...dietaryOptions, selectedOption]);
      setSelectedOption("");
    }
  };

  const handleRemoveOption = (option) => {
    const updatedOptions = dietaryOptions.filter((item) => item !== option);
    setdietaryOptions(updatedOptions);
  };

  const handleAddIngredient = () => {
    if (newIngredient && !ingredients.includes(newIngredient)) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    const updatedIngredients = ingredients.filter(
      (item) => item !== ingredient
    );
    setIngredients(updatedIngredients);
  };

  const handleSubmit = async (surprise) => {
    // send data to the backend
    console.log("Ingredients:", ingredients);
    console.log("Dietary Options:", dietaryOptions);

    let data = {
      ingredients: ingredients,
      dietaryOptions: dietaryOptions,
    };
    console.log("data: ", data);
    let url = `${BASE_URL}/recipes/findRecipes`;
    surprise
      ? (url = `${BASE_URL}/recipes/surprise`)
      : (url = `${BASE_URL}/recipes/findRecipes`);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const responseData = await response.json();

        throw new Error(`HTTP error! Status: ${response.status}
server message: ${responseData.message}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      setResults(responseData.recipes);
      // pass results to found recipes page
      surprise
        ? navigate("/surprise", {
            state: { recipe: responseData.recipe },
            replace: true,
          })
        : navigate("/found-recipes", {
            state: { recipes: responseData.recipes },
          });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <IngredientsPageContainer
      style={{ height: `calc(100vh - ${navbarHeight}px)` }}
    >
      <Typography variant="h4" gutterBottom>
        Let's get cooking!
      </Typography>

      <ChipWrapper>
        <Typography variant="subtitle1" gutterBottom>
          What ingredients do you have?
        </Typography>
        <Box display="flex" flexWrap="wrap">
          {ingredients.map((ingredient, index) => (
            <Chip
              key={index}
              label={ingredient}
              onDelete={() => handleRemoveIngredient(ingredient)}
              variant="outlined"
              sx={{ margin: 0.5 }}
            />
          ))}
        </Box>
        <TextField
          label="New Ingredient"
          fullWidth
          variant="outlined"
          margin="dense"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
        />
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </Button>
        </Box>
      </ChipWrapper>
      <ChipWrapper>
        <Typography variant="subtitle1" gutterBottom>
          Dietary Options
        </Typography>
        <Box display="flex" flexWrap="wrap">
          {dietaryOptions.map((option, index) => (
            <Chip
              key={index}
              label={option}
              onDelete={() => handleRemoveOption(option)}
              variant="outlined"
              sx={{ margin: 0.5 }}
            />
          ))}
        </Box>
        <Select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
          margin="dense"
        >
          <MenuItem disabled value="">
            Select Option
          </MenuItem>
          {predefinedDietaryOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleAddOption}>
            Add Option
          </Button>
        </Box>
      </ChipWrapper>
      <Box
        sx={{
          display: "flex",
          mt: 2,
          alignItems: "center",
          flexDirection: "column",
          gap: 4,
          width: { xs: 0.6, md: 0.3, lg: 0.2 },
        }}
      >
        <Button
          sx={{ width: 1 }}
          variant="contained"
          color="primary"
          onClick={() => handleSubmit(false)}
        >
          Find Recipes
        </Button>
        <Button
          sx={{ width: 1 }}
          variant="contained"
          component={Link}
          onClick={() => handleSubmit(true)}
        >
          Surprise me!
        </Button>
      </Box>
    </IngredientsPageContainer>
  );
};

export default IngredientsPage;

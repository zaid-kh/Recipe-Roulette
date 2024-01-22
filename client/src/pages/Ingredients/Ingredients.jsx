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

  const handleSubmit = async () => {
    // send data to the backend
    console.log("Ingredients:", ingredients);
    console.log("Dietary Options:", dietaryOptions);
    // todo: Add API call
    // get all recipes to test the API call
    await axios
      .get(`${BASE_URL}/recipes`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));

    let data = {
      ingredients: ingredients,
      dietaryOptions: dietaryOptions,
    };
    console.log("data: ", data);
    try {
      const response = await fetch(`${BASE_URL}/recipes/findRecipes`, {
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
    } catch (error) {
      console.error(error);
    }

    // await axios
    //   .post(`${BASE_URL}/recipes/findRecipes`, {
    //     ingredients: ingredients,
    //     dietaryOptions: dietaryOptions,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.error(err));
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
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Process Requirements
        </Button>
      </Box>
    </IngredientsPageContainer>
  );
};

export default IngredientsPage;

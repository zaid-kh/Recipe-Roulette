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

const predefinedRequirements = [
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
  const [selectedRequirement, setSelectedRequirement] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");

  const handleAddRequirement = () => {
    if (
      selectedRequirement &&
      !specialRequirements.includes(selectedRequirement)
    ) {
      setSpecialRequirements([...specialRequirements, selectedRequirement]);
      setSelectedRequirement("");
    }
  };

  const handleRemoveRequirement = (requirement) => {
    const updatedRequirements = specialRequirements.filter(
      (item) => item !== requirement
    );
    setSpecialRequirements(updatedRequirements);
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

  const handleSubmit = () => {
    // send data to the backend
    console.log("Ingredients:", ingredients);
    console.log("Special Requirements:", specialRequirements);
    // todo: Add API call
    // import.meta.env.VITE_API_BASE_URL
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
          Special Requirements
        </Typography>
        <Box display="flex" flexWrap="wrap">
          {specialRequirements.map((requirement, index) => (
            <Chip
              key={index}
              label={requirement}
              onDelete={() => handleRemoveRequirement(requirement)}
              variant="outlined"
              sx={{ margin: 0.5 }}
            />
          ))}
        </Box>
        <Select
          value={selectedRequirement}
          onChange={(e) => setSelectedRequirement(e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
          margin="dense"
        >
          <MenuItem disabled value="">
            Select Requirement
          </MenuItem>
          {predefinedRequirements.map((requirement) => (
            <MenuItem key={requirement} value={requirement}>
              {requirement}
            </MenuItem>
          ))}
        </Select>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddRequirement}
          >
            Add Requirement
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

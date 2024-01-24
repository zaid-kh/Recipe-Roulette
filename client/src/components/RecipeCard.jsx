import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Box,
  Chip,
  Snackbar,
  Modal,
  Container,
} from "@mui/material";
import { Favorite, Save as SaveIcon } from "@mui/icons-material";
import theme from "../config/theme";

const RecipeCard = ({ recipe, showSaveButton = false, onSaveClick }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
  // favorite button handlers
  const handleSaveClick = () => {
    // todo: save recipe to user's favorites
    // onSaveClick(recipe._id);
    setSnackbar({ open: true });
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false });
  };
  // modal handlers
  const showSteps = () => {
    // show steps modal
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
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
      <CardContent onClick={showSteps}>
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
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.default",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Steps for {recipe.name}:
            </Typography>
            <Container id="modal-modal-description" sx={{ mt: 2 }}>
              {recipe.steps.split(".").map((step, index) => {
                if (index === recipe.steps.split(".").length - 1) {
                  return null; // Skip the last step
                }
                return (
                  <Typography key={index} variant="body2">
                    {index + 1}. {step}
                  </Typography>
                );
              })}
            </Container>
          </Box>
        </Modal>
        {/* Display Dietary Options as Chips */}
        {/* <Box mt={2} display="flex" flexWrap="wrap">
          {recipe.dietaryOptions.map((option, index) => (
            <Chip
              key={index}
              label={option}
              variant="outlined"
              sx={{ margin: 0.5 }}
            />
          ))}
        </Box> */}
      </CardContent>

      {/* Recipe Actions */}
      <CardActions>
        {/* Optional Save Button */}
        {showSaveButton && (
          <IconButton onClick={handleSaveClick}>
            Add to favorites
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={snackbar.open}
              onClose={handleCloseSnackbar}
              message="Added to favorites!"
            />
            <Favorite />
          </IconButton>
        )}

        {/* Add more optional buttons/icons as needed */}
      </CardActions>
    </Card>
  );
};

export default RecipeCard;

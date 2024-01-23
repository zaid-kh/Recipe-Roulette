import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard";

const FoundRecipes = () => {
  // get recipes from nav state
  const { state } = useLocation();
  console.log("state: ", state);
  const recipes = state?.recipes;
  const navigate = useNavigate();
  return (
    <Container>
      <Typography
        textAlign={"center"}
        variant="h4"
        gutterBottom
        sx={{ marginTop: "2rem" }}
      >
        Found Recipes
      </Typography>

      {/* map recipes to a recipecard */}

      {recipes ? (
        recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} showSaveButton={true} />
        ))
      ) : (
        <>
          {/* No recipes found */}
          <Typography>No recipes found</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/cook-ingredients")}
          >
            try again
          </Button>
        </>
      )}
    </Container>
  );
};

export default FoundRecipes;

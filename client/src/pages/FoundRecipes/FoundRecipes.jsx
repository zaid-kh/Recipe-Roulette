import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard";
import useAuthContext from "../../hooks/useAuthContext";

const BASEURL = import.meta.env.VITE_BASEURL || "http://localhost:4545/api";

const FoundRecipes = () => {
  // get recipes from nav state
  const { state } = useLocation();
  console.log("state: ", state);
  const recipes = state?.recipes;
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const saveRecipe = async (recipe) => {
    // save recipe to user's favorites
    console.log("saving recipe: ", recipe);
    try {
      const response = await fetch(`${BASEURL}/users/favorite/${recipe._id}`, {
        // send bearer token in headers
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to save recipe: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("data: ", data);
    } catch (error) {
      console.error("Error saving recipe:", error.message);
    }
  };

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
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            showSaveButton={true}
            onSaveClick={saveRecipe}
          />
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

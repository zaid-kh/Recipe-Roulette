import React, { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import RecipeCard from "../../components/RecipeCard";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const BASEURL = import.meta.env.VITE_BASEURL || "http://localhost:4545/api";

const FavoriteRecipes = () => {
  // get current user
  const { user } = useAuthContext();
  const navigate = useNavigate();
  // Retrieve user's favorite recipes

  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  useEffect(() => {
    // Retrieve user's favorite recipes
    const getFavoriteRecipes = async () => {
      try {
        const response = await fetch(`${BASEURL}/users/${user.id}/favorites`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          // Handle error here if needed
          throw new Error(
            `Failed to fetch favorite recipes: ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("data: ", data);
        setFavoriteRecipes(data);
      } catch (error) {
        console.error("Error fetching favorite recipes:", error.message);
      }
    };

    // Call the function to fetch favorite recipes
    getFavoriteRecipes();
  }, [user.id]);

  return (
    <Container>
      <Typography
        textAlign={"center"}
        variant="h4"
        gutterBottom
        sx={{ marginTop: "2rem" }}
      >
        Favorite Recipes
      </Typography>

      {favoriteRecipes.length > 0 ? (
        // Display favorite recipes using RecipeCard component
        favoriteRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} showSaveButton={false} />
        ))
      ) : (
        // No favorite recipes found
        <>
          <Typography>No favorite recipes found</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/cook-ingredients")}
          >
            Discover More Recipes
          </Button>
        </>
      )}
    </Container>
  );
};

export default FavoriteRecipes;

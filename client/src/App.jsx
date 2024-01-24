import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./App.css";
import theme from "./config/theme";
import Navbar from "./components/NavBar";
import { useEffect, useState } from "react";
import Ingredients from "./pages/Ingredients/Ingredients";
import FoundRecipes from "./pages/FoundRecipes/FoundRecipes";
import SignIn from "./pages/auth/SignIn";
import AuthProviderLayout from "./AuthProviderLayout";
import SignUp from "./pages/auth/SignUp";
import useAuthContext from "./hooks/useAuthContext";
import SignOut from "./pages/auth/SignOut";
import FavoriteRecipes from "./pages/Favorites/Favorites";

function App() {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const { user } = useAuthContext();

  useEffect(() => {
    // Calculate the height of the Navbar
    const navbarElement = document.getElementById("navbar");
    if (navbarElement) {
      setNavbarHeight(navbarElement.clientHeight);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/signin"
              element={<SignIn navbarHeight={navbarHeight} />}
            />
            <Route
              path="/signup"
              element={<SignUp navbarHeight={navbarHeight} />}
            />
            <Route
              path="/signout"
              element={<SignOut navbarHeight={navbarHeight} />}
            />
            <Route path="/" element={<Home navbarHeight={navbarHeight} />} />

            <Route
              path="/cook-ingredients"
              element={<Ingredients navbarHeight={navbarHeight} />}
            />
            <Route path="/found-recipes" element={<FoundRecipes />} />
            <Route path="/favorites" element={<FavoriteRecipes />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

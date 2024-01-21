import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./App.css";
import theme from "./config/theme";
import Navbar from "./components/NavBar";
import { useEffect, useState } from "react";

function App() {
  const [navbarHeight, setNavbarHeight] = useState(0);

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
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home navbarHeight={navbarHeight} />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

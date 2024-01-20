import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import theme from "./config/theme";
import Navbar from "./components/NavBar";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes></Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

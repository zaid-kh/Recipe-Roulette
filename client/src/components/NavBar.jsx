import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  useMediaQuery,
  Box,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import theme from "../config/theme";
import useAuthContext from "../hooks/useAuthContext";

const DrawerContainer = styled("div")(({ theme }) => ({
  width: 240,
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const NavbarContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { label: "Home", to: "/" },

    { label: "Find Recipes", to: "/cook-ingredients" },
    { label: "Sign In", to: "/signin" },
  ];
  // signedin navlinks
  const signedInNavlinks = [
    { label: "Favorites Recipes", to: "/favorites" },
    { label: "Home", to: "/" },
    { label: "Find Recipes", to: "/cook-ingredients" },
    { label: "Sign Out", to: "/signout" },
  ];
  let links = navLinks;
  // get current user from auth context
  const { user } = useAuthContext();
  // if user is signed in, show signed in navlinks
  user ? (links = signedInNavlinks) : (links = navLinks);

  const renderNavLinks = () => (
    <List
      sx={{
        backgroundColor: theme.palette.background.default,
        width: 300,
        height: "100%",
      }}
    >
      {links.map((item) => (
        <ListItem key={item.label}>
          <ListItemButton
            component={Link}
            to={item.to}
            onClick={() => {
              setMobileOpen(false);
            }}
          >
            <ListItemText sx={{ textAlign: "center" }} primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <div id="navbar">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            onClick={() => {
              navigate("/");
            }}
          >
            Recipe Roulette
          </Typography>
          {isMobile && (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, textAlign: "center" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Recipe Roulette
              </Typography>
              {/* //todo: could add logo */}
              {/* <div>
                <img
                  src="your-logo.png"
                  alt="Logo"
                  style={{ width: "50px", height: "auto" }}
                />
              </div> */}
            </>
          )}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {links.map((item) => (
              <Button
                key={item.label}
                sx={{ color: theme.palette.text.secondary }}
                component={Link}
                to={item.to}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      {(isMobile || !mobileOpen) && (
        <DrawerContainer>
          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {user && (
              <List>
                <ListItem>
                  <ListItemText
                    sx={{
                      textAlign: "center",
                      color: theme.palette.text.secondary,
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                    primary={`Welcome ${user.username}`}
                  />
                </ListItem>
              </List>
            )}
            {renderNavLinks()}
          </Drawer>
        </DrawerContainer>
      )}
      <NavbarContainer>
        {/* Desktop Navigation */}
        {isMobile || ""}
      </NavbarContainer>
    </div>
  );
};

export default Navbar;

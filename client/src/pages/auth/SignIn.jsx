import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { SideImage } from "../../components/SideImage";
import logInSide from "../../assets/logInSide.jpeg";
import useLogin from "../../hooks/useLogin";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function SignIn({ navbarHeight }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { login, error, loading } = useLogin();

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // log email and password
    console.log("email: ", emailInput);
    console.log("password: ", passwordInput);
    await login(emailInput, passwordInput).then((json) => {
      if (json) {
        // show success message in snackbar
        setSnackbarOpen(true);
        // redirect to home page after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid
      container
      component="main"
      style={{ height: `calc(100vh - ${navbarHeight}px)` }}
    >
      <CssBaseline />
      <SideImage image={logInSide} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        bgcolor={"background.default"}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputLabelProps={{
                    style: { color: "#a8763e" },
                  }}
                  value={emailInput}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  InputLabelProps={{
                    style: { color: "#a8763e" },
                  }}
                  value={passwordInput}
                  onChange={handlePasswordChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </Button>
            {error && <Typography color="error">{error}</Typography>}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouteLink to={"/signup"}>
                  <Typography variant="body2">
                    Don't have an account? Sign up
                  </Typography>
                </RouteLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        horizontal="center"
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          Login successful!
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
}

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f44336",
      alternate: "#a24236",
    },
    secondary: {
      main: "#3EA6FF",
    },
    background: {
      default: "#281e16",
      alternate: "#a8763e",
      dark: "#0d1010",
    },
    text: {
      primary: "#fdfefd",
      secondary: "#0d1010",
    },
  },
});

export default theme;

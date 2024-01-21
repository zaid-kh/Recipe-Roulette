import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import theme from "../../config/theme";

const HeroContainer = styled("div")(() => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  height: "93vh",
  textAlign: "center",
  color: theme.palette.text.secondary,
  overflow: "hidden", // Ensure the overlay covers the entire video
}));

const VideoOverlay = styled("div")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)", // Adjust the alpha value for darkness
  zIndex: 0,
}));

const HeroText = styled("div")({
  zIndex: 1,
});

const HeroButton = styled(Button)({
  marginTop: 20,
  textWrap: "wrap",
  width: "200px",
  height: "50px",
});

const Home = ({ navbarHeight }) => {
  return (
    <HeroContainer style={{ height: `calc(100vh - ${navbarHeight}px)` }}>
      <video
        autoPlay
        loop
        muted
        controls={false}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/hero_vid.mp4" type="video/mp4" />
      </video>
      <VideoOverlay />

      <HeroText>
        <Typography variant="h2" gutterBottom>
          In the mood ...
        </Typography>
        <Typography variant="h3" paragraph>
          for something delicious?
        </Typography>
      </HeroText>
      <Box
        width="50%"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: { xs: "center", lg: "center" },
          gap: { lg: 4 },
        }}
      >
        <HeroButton variant="contained" component={Link} to="/cook-ingredients">
          What do you want to cook with?
        </HeroButton>
        <HeroButton variant="contained" component={Link} to="/surprise">
          Surprise me!
        </HeroButton>
      </Box>
    </HeroContainer>
  );
};

export default Home;

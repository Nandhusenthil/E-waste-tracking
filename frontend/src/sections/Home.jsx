import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      id="home"
      sx={{
        width: "100%", 
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Align content to start
        alignItems: "center",
        textAlign: "center",
        color: "white",
        backgroundImage: "url('/assets/HomeBg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflowX: "hidden",
        boxSizing: "border-box",
        px: 3,
        pt: 15, // Push content down slightly (adjust this value)
      }}
    >
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
        E-Waste Tracking Platform
      </Typography>
      <Typography variant="h6" sx={{ mt: 1, maxWidth: "800px" }}>
        A smart platform for tracking and managing electronic waste from
        municipality centers to recyclers and government authorities.
      </Typography>
    </Box>
  );
};

export default Home;

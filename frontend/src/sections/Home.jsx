// src/sections/Home.jsx
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url(/assets/HomeBg.jpg)", // no quotes '' needed inside url()
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        minHeight: "100vh", // Full screen height
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff", // Better visibility if image is dark
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h3" gutterBottom>
        How E-Waste is Tracked
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: "600px", fontSize: "18px" }}>
        Our platform efficiently tracks e-waste movement from municipality centers to recyclers and government authorities.
      </Typography>
    </Box>
  );
};

export default Home;

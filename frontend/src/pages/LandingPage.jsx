// src/pages/LandingPage.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../sections/Home";
import About from "../sections/About";
import { Box } from "@mui/material";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ width: "100%", overflowX: "hidden" }}>
        <Box id="home-section">
          <Home />
        </Box>
        <Box id="about-section">
          <About />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default LandingPage;

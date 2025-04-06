import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./sections/Home";
import About from "./sections/About";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Box 
      sx={{ 
        paddingTop: "64px",  // Adjusting for fixed navbar
        width: "100vw", 
        minHeight: "100vh", 
        overflowX: "hidden" 
      }}
    >
      <Navbar />
      
      {/* Updated section IDs for smooth scrolling */}
      <Box id="home-section"><Home /></Box>
      <Box id="about-section"><About /></Box>
      
      
      <Footer />
    </Box>
  );
};

export default App;

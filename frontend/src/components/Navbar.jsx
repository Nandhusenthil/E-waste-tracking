import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-scroll";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const partners = [
  { name: "List of Recyclers", pdf: "/pdfs/ListOfRecyclers.pdf" },
  { name: "List of Dismantlers in Tamil Nadu", pdf: "/pdfs/ListOfDismantlers.pdf" },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: "#5F99AE", // Light Green Background
        width: "100%", 
        zIndex: 1000 
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer", color: "black" }}>
          E-Waste Tracking
        </Typography>

        {/* Navigation Links */}
        <Button sx={{ color: "black" }}>
          <Link to="home-section" smooth={true} duration={500} offset={-64} style={{ textDecoration: "none", color: "black" }}>
            HOME
          </Link>
        </Button>
        <Button sx={{ color: "black" }}>
          <Link to="about-section" smooth={true} duration={500} offset={-64} style={{ textDecoration: "none", color: "black" }}>
            ABOUT
          </Link>
        </Button>

        {/* Partners Dropdown */}
        <Button
          sx={{ color: "black" }}
          aria-controls="partners-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          endIcon={<ArrowDropDownIcon />}
        >
          PARTNERS
        </Button>
        <Menu
          id="partners-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {partners.map((partner, index) => (
            <MenuItem key={index} onClick={handleMenuClose}>
              <a
                href={partner.pdf}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "black" }}
              >
                {partner.name}
              </a>
            </MenuItem>
          ))}
        </Menu>

        {/* Login / Signup Button */}
        <Button sx={{ color: "black" }}>
          <Link to="login-section" smooth={true} duration={500} offset={-64} style={{ textDecoration: "none", color: "black" }}>
            LOGIN / SIGNUP
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Container, Card, CardContent, Typography, TextField, Button, Tabs, Tab } from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("municipality"); // Default role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        role,
        email,
        password,
      });

      alert(response.data.message);
      localStorage.setItem("token", response.data.token); // Store token
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      alert(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card sx={{ textAlign: "center", p: 3 }}>
        <CardContent>
          <LoginIcon sx={{ fontSize: 50, color: "#4CAF50" }} />
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
            Login as
          </Typography>

          {/* Role Selection Tabs */}
          <Tabs
            value={role}
            onChange={(e, newValue) => setRole(newValue)}
            variant="fullWidth"
            sx={{ my: 2 }}
          >
            <Tab label="Municipality Center" value="municipality" />
            <Tab label="Recycler Plant" value="recycler" />
            <Tab label="Government" value="government" />
          </Tabs>

          {/* Login Form */}
          <TextField
            label="Email"
            type="email"
            fullWidth
            sx={{ mt: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            sx={{ mt: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" fullWidth sx={{ mt: 3, bgcolor: "#4CAF50" }} onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;

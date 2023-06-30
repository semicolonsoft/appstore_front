import {
  Button,
  Container,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";

import { AuthContext } from "../components/AuthProvider";
import apis from "../services/api";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [userMode, setUserMode] = useState("user"); // 'user' or 'developer'

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const handleUserModeChange = (newUserMode) => {
    setUserMode(newUserMode);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      apis.signIn(phone, password).then((data) => {
        login(data.access_token);
        navigate("/");
      });
    } else {
      apis
        .signUp(phone, password, name, family, userMode === "developer")
        .then((data) => {
          login(data.access_token);
          navigate("/");
        });
    }
    setPhone("");
    setPassword("");
    setFamily("");
    setName("");
  };

  const phoneRegex = /^(\+98|0)?9\d{9}$/; // Iranian mobile number pattern

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Auth Page
      </Typography>

      {/* User Mode Selection */}
      {mode === "signup" && (
        <RadioGroup
          row
          value={userMode}
          onChange={(e) => handleUserModeChange(e.target.value)}
          aria-label="User Mode"
          name="userMode"
        >
          <FormControlLabel value="user" control={<Radio />} label="User" />
          <FormControlLabel
            value="developer"
            control={<Radio />}
            label="Developer"
          />
        </RadioGroup>
      )}

      {/* Render the login or signup form based on the 'mode' state */}
      {mode === "login" ? (
        <form onSubmit={handleFormSubmit}>
          <Typography variant="h6" align="center" gutterBottom>
            Login
          </Typography>
          {/* Add your login form inputs here */}
          <TextField
            type="tel"
            label="Phone"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+98</InputAdornment>
              ),
            }}
            error={!phoneRegex.test(phone)}
            helperText={!phoneRegex.test(phone) && "Invalid phone number"}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            error={password.length < 3}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!phoneRegex.test(phone) || password.length < 3}
          >
            Login
          </Button>
          <Typography align="center">
            Don't have an account?{" "}
            <Button
              type="button"
              onClick={() => handleModeChange("signup")}
              color="secondary"
            >
              Sign up
            </Button>
          </Typography>
        </form>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <Typography variant="h6" align="center" gutterBottom>
            Sign Up
          </Typography>
          {/* Add your signup form inputs here */}
          <TextField
            type="tel"
            label="Phone"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+98</InputAdornment>
              ),
            }}
            error={!phoneRegex.test(phone)}
            helperText={!phoneRegex.test(phone) && "Invalid phone number"}
          />
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Family"
            variant="outlined"
            fullWidth
            value={family}
            onChange={(e) => setFamily(e.target.value)}
            margin="normal"
          />

          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            error={password.length < 3}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!phoneRegex.test(phone) || password.length < 3}
          >
            Sign Up
          </Button>
          <Typography align="center">
            Already have an account?{" "}
            <Button
              type="button"
              onClick={() => handleModeChange("login")}
              color="secondary"
            >
              Login
            </Button>
          </Typography>
        </form>
      )}
    </Container>
  );
}

export default AuthPage;

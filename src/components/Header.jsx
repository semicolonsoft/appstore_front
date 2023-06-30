import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";

import AddApp from "./AddApp";
import { AuthContext } from "./AuthProvider";
import apis from "../services/api";
import { useNavigate } from "react-router-dom";

function Header() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ mb: 10 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          MyBazar
        </Typography>
        {isLoggedIn && (
          <>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ whiteSpace: "nowrap" }}
            >
              {user.first_name + " " + user.last_name}
            </Typography>
            <Box p={1} />
            {
              <Button variant="contained" onClick={logout}>
                Logout
              </Button>
            }
            <Box p={1} />
            {user.is_developer && <AddApp />}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;

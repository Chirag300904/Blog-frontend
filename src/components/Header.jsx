import React, { useState } from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Redux/store.js";
import toast from "react-hot-toast";

const Header = () => {
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("User logged out successfully");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "orange" }}>
        <Toolbar>
          <Typography variant="h4">Blog App</Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft={"auto"}>
              <Tabs
                textColor="white"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab
                  label="Create Blogs"
                  LinkComponent={Link}
                  to="/create-blogs"
                />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft={"auto"}>
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button
                sx={{ margin: 1, color: "white" }}
                LinkComponent={Link}
                to="/"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

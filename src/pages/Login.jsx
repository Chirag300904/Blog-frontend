import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../Redux/store.js";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/user/login", {
        password: inputs.password,
        email: inputs.email,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        localStorage.setItem("username", data?.user.username);
        dispatch(authActions.login());
        toast.success("User logged in successfully");
        navigate("../");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          boxShadow="20px 20px 30px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography variant="h4" padding={3} textAlign="center">
            LOGIN
          </Typography>
          <TextField
            placeholder="Enter Your Email"
            name="email"
            margin="normal"
            type="email"
            required
            value={inputs.email}
            onChange={handleChange}
          />
          <TextField
            placeholder="Password"
            name="password"
            margin="normal"
            type="password"
            required
            value={inputs.passsword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: 3,
              marginTop: 3,
              backgroundColor: "orange",
            }}
          >
            Login
          </Button>
          <Button
            sx={{ borderRadius: 3, marginTop: 3, color: "orange" }}
            onClick={() => navigate("/register")}
          >
            New User ? Please Signup
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;

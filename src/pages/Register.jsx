import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  // State
  const [inputs, setInputs] = useState({
    username: "",
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
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.username,
        password: inputs.password,
        email: inputs.email,
      });
      if (data.success) {
        toast.success("User registration successfully");
        navigate("/login");
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
            REGISTER
          </Typography>
          <TextField
            placeholder="Enter Your Name"
            name="username"
            margin="normal"
            type="text"
            required
            value={inputs.username}
            onChange={handleChange}
          />
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
            value={inputs.password}
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
            Submit
          </Button>
          <Button
            sx={{ borderRadius: 3, marginTop: 3, color: "orange" }}
            onClick={() => navigate("/login")}
          >
            Already Registered? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;

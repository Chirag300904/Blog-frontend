import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const navigate = useNavigate();
  // State
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
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
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: localStorage.getItem("userId"),
      });
      if (data.success) {
        toast.success("Blog created successfully");
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width="80%"
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          boxShadow="20px 20px 30px #ccc"
          padding={3}
          borderRadius={10}
        >
          <Typography
            variant="h4"
            padding={3}
            textAlign="center"
            fontWeight="bold"
            color="orange"
          >
            Create A Blog
          </Typography>
          <TextField
            placeholder="Title"
            name="title"
            margin="normal"
            type="text"
            required
            value={inputs.title}
            onChange={handleChange}
          />
          <TextField
            placeholder="Description"
            name="description"
            margin="normal"
            type="text"
            required
            value={inputs.description}
            onChange={handleChange}
          />
          <TextField
            placeholder="Please Enter Image Url"
            name="image"
            margin="normal"
            type="text"
            required
            value={inputs.image}
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
            Create blog
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;

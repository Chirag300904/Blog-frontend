import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const BlogDetail = () => {
  // State
  const [inputs, setInputs] = useState({});
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  // Get blog details
  const getBlogDetail = async () => {
    const { data } = await axios.get(
      `https://blog-backend-itiv.onrender.com/api/v1/blog/get-blog/${id}`
    );

    if (data?.success) {
      setBlog(data?.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        image: data.blog.image,
      });
    }
  };

  // Update Blog

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `https://blog-backend-itiv.onrender.com/api/v1/blog/update-blog/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
        }
      );
      if (data.success) {
        toast.success("Blog updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  console.log(blog);
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
            Update Blog
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
            Update blog
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BlogDetail;

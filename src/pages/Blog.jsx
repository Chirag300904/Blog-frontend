import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  // Get blogs
  const getAllBlog = async () => {
    try {
      const { data } = await axios.get(
        "https://blog-backend-itiv.onrender.com/api/v1/blog/all-blog"
      );
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlog();
  }, []);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))}
    </div>
  );
};

export default Blog;

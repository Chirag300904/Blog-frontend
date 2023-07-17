import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  // Get User blogs
  const getUserBlog = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog//user-blog/${userId}`);
      if (data?.success) {
        setBlogs(data?.userBlogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1
          style={{
            color: "orange",
            margin: "auto",
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          You have not created any blog
        </h1>
      )}
    </div>
  );
};

export default UserBlog;

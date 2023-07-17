import { Route, Routes } from "react-router-dom";

import Blog from "./pages/Blog.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import "./App.css";
import Header from "./components/Header";
import UserBlog from "./pages/UserBlog.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Header />
      <Toaster
        toastOptions={{
          duration: 5000,
          style: {
            background: "green",
            color: "#fff",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/my-blogs" element={<UserBlog />} />
        <Route path="/create-blogs" element={<CreateBlog />} />
        <Route path="/blog-details/:id" element={<BlogDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;

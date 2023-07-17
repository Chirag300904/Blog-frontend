import * as React from "react";
import { orange } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import toast from "react-hot-toast";
import {
  Box,
  IconButton,
  Typography,
  Avatar,
  CardContent,
  CardMedia,
  CardHeader,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const formattedTime = moment(time).format("MMMM Do YYYY, h:mm:ss a");

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `https://blog-backend-itiv.onrender.com/api/v1/blog/delete-blog/${id}`
      );

      if (data?.success) {
        toast.success("Blog deleted successfully");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      sx={{
        width: "45%",
        margin: "auto",
        mt: 2,
        borderRadius: 3,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleEdit}>
            <EditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: orange[500] }} aria-label="User">
            <img
              src="data:image/png;base64,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"
              alt="User"
              style={{ height: 50 }}
            />
          </Avatar>
        }
        title={username}
        subheader={formattedTime}
      />
      <CardMedia
        component="img"
        height="194"
        sx={{ borderRadius: 3, objectFit: "fit" }}
        image={image}
        alt="Blog"
      />
      <CardContent>
        <Typography variant="body1" color="text.primary">
          Title : {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description : {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

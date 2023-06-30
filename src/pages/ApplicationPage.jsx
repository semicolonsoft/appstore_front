import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import URLS from "../services/url";
import apis from "../services/api";
import { useParams } from "react-router-dom";

function ApplicationPage() {
  const { id } = useParams(); // Extracts the ID parameter from the URL
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [application, setApplication] = useState({
    id: null,
    name: "",
    description: "",
    developer: {
      image: null,
      first_name: "",
      last_name: "",
    },
    cover: "",
    file: "",
    is_active: true,
    created_at: "",
    updated_at: "",
  });
  useEffect(() => {
    apis.application(id).then((app) => {
      setApplication(app);
    });
    apis.getComments(id).then((cs) => {
      return setComments(cs);
    });
  }, [id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      return;
    }

    apis.sendComment(parseInt(id), comment).then((newComment) => {
      setComments([...comments, newComment]);
    });
    setComment("");
  };
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = URLS.MAIN + application.file;
    link.download = URLS.MAIN + application.file;
    link.click();
  };
  return (
    <Container maxWidth="md">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Stack direction={"row"}>
          <Avatar
            src={URLS.MAIN + application.cover}
            alt="App"
            sx={{ width: "200px", height: "200px", borderRadius: 3 }}
          />
          <Box p={2} />
          <Stack>
            <Typography variant="h5" gutterBottom>
              {application.name}
            </Typography>
            <Typography variant="subtitle1">
              Developer: {application.developer.first_name}{" "}
              {application.developer.last_name}
            </Typography>
            <Typography gutterBottom>
              Description: {application.description}
            </Typography>
          </Stack>
        </Stack>
        <Button variant="contained" color="primary" onClick={handleDownload}>
          Download App
        </Button>
      </Box>

      <div>
        <Typography variant="h6" align="center" gutterBottom>
          Comments
        </Typography>
        {comments.length === 0 ? (
          <Typography align="center">No comments yet.</Typography>
        ) : (
          <List>
            {comments.map((c) => (
              <ListItem key={c.id} sx={{borderBottom: "1px solid #00000022" }}>
                <ListItemIcon>
                  <Avatar src={URLS.MAIN + c.user.image}></Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={c.user.first_name + " " + c.user.last_name}
                  secondary={c.text}
                />
              </ListItem>
            ))}
          </List>
        )}

        <form onSubmit={handleCommentSubmit}>
          <TextField
            label="Leave a comment"
            variant="outlined"
            fullWidth
            value={comment}
            onChange={handleCommentChange}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default ApplicationPage;

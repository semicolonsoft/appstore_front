import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import apis from "../services/api";

function AddApp() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    setCoverImage(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("cover", coverImage);
    formData.append("file", file);

    apis.addApplication(formData).then(() => {
      handleClose();
    });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add App
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                value={name}
                onChange={handleNameChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                fullWidth
                required
                multiline
                rows={4}
                margin="normal"
              />
              <Box marginBottom={2}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                />
              </Box>
              <Box marginBottom={2}>
                <input
                  type="file"
                  accept=".zip,.apk"
                  onChange={handleFileChange}
                />
              </Box>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddApp;

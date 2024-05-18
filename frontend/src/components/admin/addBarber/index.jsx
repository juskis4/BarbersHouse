import * as React from "react";
import { useState } from "react";
import { Avatar, Alert } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { addBarber } from "../../../services/barberService.js";
const AddBarbers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const bio = data.get("bio");
    const photoUrl = data.get("photoUrl");
    setIsLoading(true);
    setError(null);

    const newBarberData = {
      Name: name,
      Email: email,
      Bio: bio,
      PhotoUrl: photoUrl,
    };

    try {
      await addBarber(newBarberData);
      setSaveSuccess(true);
    } catch (error) {
      setError("An error occurred while adding a Barber. Please try again.");
      console.error("Error adding barber:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AddCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add a Barber
        </Typography>
        {saveSuccess && (
          <Alert severity="success">Barber added successfully!</Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            autoComplete="email-address"
          />
          <TextField
            variant="outlined"
            multiline
            required
            rows={4}
            fullWidth
            margin="normal"
            name="bio"
            label="Bio"
            type="bio"
            id="bio"
            autoComplete="bio"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="photoUrl"
            label="Photo URL"
            type="photoUrl"
            id="photoUrl"
            autoComplete="photo-url"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Add Barber
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default AddBarbers;

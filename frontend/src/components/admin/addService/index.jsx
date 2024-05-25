import React, { useState, useEffect } from "react";
import { getAllBarbers } from "../../../services/barberService";
import { createService } from "../../../services/servicesService"; // Your service function
import {
  Avatar,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Button,
  Box,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const data = await getAllBarbers();
        setBarbers(data);
      } catch (err) {
        console.error("Error fetching barbers:", err);
      }
    };
    fetchBarbers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const serviceData = {
      title: title,
      description: description,
      duration: parseInt(duration, 10),
      price: parseFloat(price, 10),
    };

    try {
      await createService(selectedBarber, serviceData);
      setSaveSuccess(true);
    } catch (error) {
      setError(
        "An error occurred while creating the service. Please try again.",
      );
      console.error("Error adding service:", error);
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
          Add a Service
        </Typography>
        {saveSuccess && (
          <Alert severity="success">Service added successfully!</Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="barber-label">Barber</InputLabel>
            <Select
              labelId="barber-label"
              id="barber"
              value={selectedBarber}
              label="Barber"
              onChange={(e) => setSelectedBarber(e.target.value)}
            >
              <MenuItem value="">Select Barber</MenuItem>
              {barbers.map((barber) => (
                <MenuItem key={barber.barberId} value={barber.barberId}>
                  {barber.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="duration"
            label="Duration (minutes)"
            name="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price (DKK)"
            name="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* Submit Button and Error Message */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Add Service
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default AddService;

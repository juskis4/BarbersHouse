import React, { useState, useEffect } from "react";
import {
  getServiceById,
  updateService,
} from "../../../../services/servicesService.js";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Alert,
  Grid,
  Box,
} from "@mui/material";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDuration, setEditedDuration] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await getServiceById(serviceId);
        setService(data);

        setEditedTitle(data.title);
        setEditedDescription(data.description);
        setEditedDuration(data.duration.toString());
        setEditedPrice(data.price.toString());
      } catch (error) {
        console.error("Error fetching service details:", error);
        setError("Error fetching service details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!service) {
    return <Typography variant="h6">Service not found.</Typography>;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    try {
      const updatedService = {
        title: editedTitle,
        description: editedDescription,
        duration: parseInt(editedDuration, 10),
        price: parseFloat(editedPrice, 10),
      };

      await updateService(serviceId, updatedService);
      setService({ ...service, ...updatedService });
      setSaveSuccess(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating service:", error);
      setError("Error updating service. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTitle(service.title);
    setEditedDescription(service.description);
    setEditedDuration(service.duration.toString());
    setEditedPrice(service.price.toString());
  };

  const DetailsContent = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
        <Typography variant="body1">Title:</Typography>
        {isEditing ? (
          <TextField
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            fullWidth
          />
        ) : (
          <Typography>{service.title}</Typography>
        )}
      </Grid>

      <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
        <Typography variant="body1">Price:</Typography>
        {isEditing ? (
          <TextField
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
            fullWidth
          />
        ) : (
          <Typography>{service.price} DKK</Typography>
        )}
      </Grid>

      <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
        <Typography variant="body1">Duration:</Typography>
        {isEditing ? (
          <TextField
            value={editedDuration}
            onChange={(e) => setEditedDuration(e.target.value)}
            fullWidth
          />
        ) : (
          <Typography>{service.duration} min</Typography>
        )}
      </Grid>

      <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
        <Typography variant="body1">Description:</Typography>
        {isEditing ? (
          <TextField
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        ) : (
          <Typography>{service.description}</Typography>
        )}
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Service ID {service.serviceId}
      </Typography>

      <Grid container spacing={5} sx={{ mt: 1 }}>
        {/* Barber */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Barber ID: {service.barberId}
            </Typography>
            <Box>
              <Button
                component={Link}
                to={`/admin/barbers/${service.barberId}`}
                variant="contained"
              >
                View
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Service Details */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            {DetailsContent()}

            {isEditing ? (
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveClick}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                onClick={handleEditClick}
                sx={{ mt: 2 }}
              >
                Edit
              </Button>
            )}

            {saveSuccess && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Service details saved successfully!
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServiceDetails;

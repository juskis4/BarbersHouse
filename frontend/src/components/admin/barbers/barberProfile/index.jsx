import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import Container from "@mui/material/Container";
import { Typography, TextField, Button, Paper, Avatar } from "@mui/material";
import { getBarbersWithServices } from "../../../../services/bookingService.js";
import StatBox from "../statBox/index.jsx";
import Services from "./services/index.jsx";

const BarberProfile = () => {
  const { barberId } = useParams();
  const [barber, setBarber] = useState(null);
  const [services, setServices] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [editedName, setEditedName] = useState("");
  const [editedBio, setEditedBio] = useState("");

  const handleSave = () => {
    // TODO: Send updated data (editedName, editedBio) to your API
    // ... (your update logic here)
  };

  useEffect(() => {
    const fetchBarber = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const allBarbers = await getBarbersWithServices();
        const foundBarber = allBarbers.find(
          (b) => b.barberId === parseInt(barberId, 10),
        );
        setBarber(foundBarber);
        setServices(foundBarber?.services || []);
        setEditedName(foundBarber?.name || "");
        setEditedBio(foundBarber?.bio || "");
      } catch (error) {
        setError(
          "An error occurred while retrieving Barber. Please try again.",
        );
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBarber();
  }, [barberId]);

  if (!barber) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 250,
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              fontWeight="bold"
              align="center"
              gutterBottom
            >
              Profile
            </Typography>
            <Avatar
              variant="rounded"
              alt="User Profile"
              src={barber.photoUrl}
              sx={{ width: 100, height: 110, mb: 2, mt: 2 }}
            />
            <Typography variant="subtitle1" align="center">
              {barber.name}
            </Typography>
          </Paper>
          <Paper
            sx={{
              p: 2,
              mt: 2,
              display: "flex",
              flexDirection: "column",
              height: 60,
              alignItems: "center",
            }}
          >
            <StatBox
              title="Cuts"
              bookings="300"
              icon={
                <ContentCutIcon sx={{ color: "secondary", fontSize: "28px" }} />
              }
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 325,
            }}
          >
            <Typography variant="h6" fontWeight="bold" align="left">
              Edit Details
            </Typography>

            <TextField
              label="Name"
              variant="outlined"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Bio"
              variant="outlined"
              multiline
              rows={4}
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleSave}
              disabled={isLoading}
            >
              Save
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              minHeight: 90,
            }}
          >
            <Typography variant="h6" fontWeight="bold" align="left">
              Services
            </Typography>
            <Services services={services} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BarberProfile;

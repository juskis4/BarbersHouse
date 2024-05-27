import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import PaidIcon from "@mui/icons-material/Paid";
import Container from "@mui/material/Container";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Alert,
} from "@mui/material";
import {
  updateBarber,
  getBarbersWithServices,
} from "../../../../services/barberService.js";
import StatBox from "../statBox/index.jsx";
import Services from "./services/index.jsx";

const BarberProfile = () => {
  const { barberId } = useParams();
  const [barber, setBarber] = useState(null);
  const [services, setServices] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedBio, setEditedBio] = useState("");

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedBarber = {
        Email: editedEmail,
        Name: editedName,
        Bio: editedBio,
      };

      await updateBarber(barber.barberId, updatedBarber);

      setBarber({
        ...barber,
        ...updatedBarber,
      });

      setSaveSuccess(true);
    } catch (error) {
      console.error("Error updating barber:", error);
      setError("Error updating barber. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
        setEditedEmail(foundBarber?.email || "");
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
        <Grid xs={12} md={4} lg={3}>
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
              sx={{ width: 150, height: 150, mb: 1, mt: 1 }}
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
              value="300"
              icon={
                <ContentCutIcon sx={{ color: "secondary", fontSize: "28px" }} />
              }
            />
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
              title="DKK"
              value="53200"
              icon={<PaidIcon sx={{ color: "secondary", fontSize: "32px" }} />}
            />
          </Paper>
        </Grid>
        <Grid xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              minHeight: 405,
            }}
          >
            {saveSuccess && (
              <Alert severity="success">
                Barber details saved successfully!
              </Alert>
            )}
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
              label="Email"
              variant="outlined"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
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
        <Grid xs={12} md={12} lg={12}>
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

import React, { useState, useEffect } from "react";
import {
  getBookingById,
  updateBooking,
} from "../../../../services/bookingService.js";

import { useParams, Link } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  CircularProgress,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const BookingDetails = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const allowedStatuses = ["Pending", "Cancelled", "Completed"];
  const [isLoading, setIsLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedBookingDateTime, setEditedBookingDateTime] = useState("");
  const [editedStatus, setEditedStatus] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingById(bookingId);
        setBooking(data);
        if (data) {
          setEditedBookingDateTime(
            new Date(data.bookingDateTime).toLocaleString(),
          );
          setEditedStatus(data.status);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
        setError("Error fetching booking details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!booking) {
    return <Typography variant="h6">Booking not found.</Typography>;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    try {
      const updatedBooking = {
        bookingDateTime: new Date(editedBookingDateTime).toISOString(),
        status: editedStatus,
      };

      await updateBooking(bookingId, updatedBooking);

      setBooking({
        ...booking,
        ...updatedBooking,
      });
      setSaveSuccess(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating booking:", error);
      setError("Error updating booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Booking ID {booking.bookingId}
      </Typography>
      <Grid container spacing={4}>
        {/* Barber Details */}
        <Grid xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 260,
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
              Barber ID: {booking.barber.barberId}
            </Typography>
            <Avatar
              variant="rounded"
              alt="User Profile"
              src={booking.barber.photoUrl}
              sx={{ width: 150, height: 150, mb: 1, mt: 1 }}
            />
            <Typography variant="subtitle1" align="center">
              {booking.barber.name}
            </Typography>
          </Paper>
          {/* Customer Details */}
          <Paper
            sx={{
              p: 2,
              mt: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: 220,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              align="center"
              gutterBottom
            >
              Customer Details
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Customer Name"
                  secondary={booking.customerName}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Customer Email"
                  secondary={booking.customerEmail}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Booking Details */}
        <Grid xs={12} md={4} lg={7}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              minHeight: 260,
            }}
          >
            {saveSuccess && (
              <Alert severity="success">
                Booking details saved successfully!
              </Alert>
            )}
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Booking Details
            </Typography>
            <List>
              <ListItem>
                {isEditing ? (
                  <TextField
                    type="datetime-local"
                    value={editedBookingDateTime}
                    onChange={(e) => setEditedBookingDateTime(e.target.value)}
                  />
                ) : (
                  <ListItemText
                    primary="Booking Time"
                    secondary={dayjs(booking.bookingDateTime)
                      .utc()
                      .format("YYYY-MM-DD HH:mm")}
                  />
                )}
              </ListItem>
              <ListItem>
                {isEditing ? (
                  <FormControl fullWidth>
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                      labelId="status-select-label"
                      value={editedStatus}
                      onChange={(e) => setEditedStatus(e.target.value)}
                    >
                      {allowedStatuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <ListItemText primary="Status" secondary={booking.status} />
                )}
              </ListItem>
            </List>
            {isEditing ? (
              <Button
                variant="contained"
                onClick={handleSaveClick}
                disabled={isLoading}
              >
                Save
              </Button>
            ) : (
              <Button variant="outlined" onClick={handleEditClick}>
                Edit
              </Button>
            )}
          </Paper>

          {/* Service Details */}
          <Paper
            sx={{
              p: 2,
              mt: 4,
              display: "flex",
              flexDirection: "column",
              height: 220,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ width: "100%", align: "center" }}
            >
              Booked Service
            </Typography>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 3, md: 4 }}
            >
              <Grid xs={6}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Service"
                      secondary={booking.service.title}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Duration"
                      secondary={`${booking.service.duration} min`}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid xs={6}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Price"
                      secondary={`${booking.service.price} DKK`}
                    />
                  </ListItem>
                  <ListItem>
                    {/* TODO: change the link */}
                    <Button
                      sx={{ mt: 1 }}
                      component={Link}
                      to={`/admin/bookings/${booking.bookingId}`}
                    >
                      View
                    </Button>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookingDetails;

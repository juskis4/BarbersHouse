import * as React from "react";
import { useState, useEffect } from "react";
import {
  Avatar,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { createManualBooking } from "../../../services/bookingService";
import { getBarbersWithServices } from "../../../services/barberService.js";
import emailService from "../../../services/emailService";

const AddBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [bookingType, setBookingType] = useState("");
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState("");
  const [services, setServices] = useState([]); // All services
  const [selectedService, setSelectedService] = useState("");
  const [startTime, setStartTime] = useState(dayjs(new Date()));
  const [barberServices, setBarberServices] = useState([]);

  useEffect(() => {
    const fetchBarbersAndServices = async () => {
      setIsLoading(true);
      try {
        const data = await getBarbersWithServices();
        setBarbers(data);
        setServices(data.flatMap((barber) => barber.services));
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBarbersAndServices();
  }, []);

  useEffect(() => {
    // Filter services when barber changes
    if (selectedBarber) {
      const filteredServices = services.filter(
        (service) => service.barberId === selectedBarber,
      );
      setSelectedService(filteredServices[0]?.id || "");
      setBarberServices(filteredServices);
    } else {
      setSelectedService("");
      setBarberServices([]);
    }
  }, [selectedBarber, services]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    let bookingData = {
      barberId: selectedBarber,
      startTime: startTime.toISOString(),
    };

    if (bookingType === "blocked") {
      bookingData.duration = parseInt(event.currentTarget.duration.value, 10);
    } else if (bookingType === "customer") {
      const customerName = event.currentTarget.customerName.value;
      const customerEmail = event.currentTarget.customerEmail.value;

      bookingData = {
        ...bookingData,
        customerName,
        customerEmail,
        serviceId: selectedService,
      };
    }

    try {
      await createManualBooking(bookingData);

      const bookedBarber = barbers.find(
        (barber) => barber.barberId === bookingData.barberId,
      );
      const bookedService = bookedBarber.services.find(
        (service) => service.serviceId === bookingData.serviceId,
      );
      const emailData = {
        BarberName: bookedBarber.name,
        BarberEmail: bookedBarber.email,
        CustomerName: bookingData.customerName,
        CustomerEmail: bookingData.customerEmail,
        ServiceTitle: bookedService.title,
        Duration: bookedService.duration,
        Price: bookedService.price,
        StartTime: bookingData.startTime,
      };
      await emailService.sendBookingConfirmationEmails(emailData);

      setSaveSuccess(true);
    } catch (error) {
      setError("An error occurred while adding the booking. Please try again.");
      console.error("Error adding booking:", error);
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
          Add a Booking
        </Typography>
        {saveSuccess && (
          <Alert severity="success">Booking added successfully!</Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="booking-type-label">Booking Type</InputLabel>
            <Select
              sx={{ minWidth: 230 }}
              labelId="booking-type-label"
              id="booking-type"
              value={bookingType}
              label="Booking Type"
              onChange={(e) => setBookingType(e.target.value)}
            >
              <MenuItem value="blocked">Blocked</MenuItem>
              <MenuItem value="customer">Customer</MenuItem>
            </Select>
          </FormControl>

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

          {/* Conditional Fields based on bookingType */}
          {bookingType === "blocked" && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="duration"
                label="Duration (minutes)"
                name="duration"
                type="number"
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Start Time"
                  value={startTime}
                  timezone="UTC"
                  sx={{ mt: 2 }}
                  onChange={(newValue) => setStartTime(dayjs(newValue))}
                  slotProps={{
                    textField: { size: "small" },
                  }}
                />
              </LocalizationProvider>
            </>
          )}

          {bookingType === "customer" && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="customerName"
                label="Customer Name"
                name="customerName"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="customerEmail"
                label="Customer Email"
                type="email"
                id="customerEmail"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="service-label">Service</InputLabel>
                <Select
                  labelId="service-label"
                  id="service"
                  value={selectedService}
                  label="Service"
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <MenuItem value="">Select Service</MenuItem>
                  {barberServices.map((service) => (
                    <MenuItem key={service.serviceId} value={service.serviceId}>
                      {service.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Start Time"
                  value={startTime}
                  timezone="UTC"
                  sx={{ mt: 2 }}
                  onChange={(newValue) => setStartTime(dayjs(newValue))}
                  slotProps={{
                    textField: { size: "small" },
                  }}
                />
              </LocalizationProvider>
            </>
          )}

          {/* Submit Button and Error Message */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Add Booking
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default AddBooking;

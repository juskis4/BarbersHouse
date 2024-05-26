import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { createBooking } from "../../../../services/bookingService";
import emailService from "../../../../services/emailService";

function Step4({
  selectedBarber,
  selectedServices,
  selectedTimeSlot,
  handleNext,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleConfirmBooking = async () => {
    try {
      const [firstService] = selectedServices;
      const serviceId = firstService?.serviceId;
      const bookingData = {
        BarberId: selectedBarber.barberId,
        CustomerName: name,
        CustomerEmail: email,
        ServiceId: serviceId,
        duration: null,
        StartTime: selectedTimeSlot.startTime,
      };

      await createBooking(bookingData);

      const emailData = {
        BarberName: selectedBarber.name,
        BarberEmail: selectedBarber.email,
        CustomerName: name,
        CustomerEmail: email,
        ServiceTitle: firstService.title,
        Duration: firstService.duration,
        Price: firstService.price,
        StartTime: selectedTimeSlot.startTime,
      };
      await emailService.sendBookingConfirmationEmails(emailData);

      handleNext();
    } catch (error) {
      console.error("Error creating booking:", error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" onClick={handleConfirmBooking} sx={{ mt: 2 }}>
        Confirm Booking
      </Button>
    </Box>
  );
}

export default Step4;

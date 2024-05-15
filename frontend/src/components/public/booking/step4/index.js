import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import { createBooking } from '../../../../services/bookingService'

function Step4({ selectedBarberId, selectedServices, selectedTimeSlot, handleNext }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleConfirmBooking = async () => {
    try {
      const [firstService] = selectedServices;  
      const serviceId = firstService?.serviceId;
      const bookingData = {
        BarberId: selectedBarberId,
        CustomerId: 1, 
        ServiceId: serviceId, 
        StartTime: selectedTimeSlot.startTime,
      };

      await createBooking(bookingData);
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
      <Button 
        variant="contained" 
        onClick={handleConfirmBooking}
        sx={{ mt: 2 }}
      >
        Confirm Booking
      </Button>
    </Box>
  );
}

export default Step4;

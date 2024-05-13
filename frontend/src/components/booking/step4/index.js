import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

function Step4({ selectedBarberId, selectedServices, selectedTimeSlot }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleConfirmBooking = () => {
    
    console.log("Booking confirmed:", {
      barberId: selectedBarberId,
      services: selectedServices,
      timeSlot: selectedTimeSlot,
      customer: { name, email }
    });

    // Reset the stepper or perform any other necessary actions
    //onBookingConfirmed(); 
  };

  return (
    <Box>
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

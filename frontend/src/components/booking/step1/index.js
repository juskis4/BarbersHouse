import * as React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';

function Step1({ barbers, isLoading, selectedBarberId, onBarberChange }) {
  const handleChange = (event) => {
    onBarberChange(event.target.value);
  };

  return (
    <div>
      {isLoading ? (
        <div style={{ width: '100%', textAlign: 'center', marginTop: 20 }}>
          <CircularProgress />
        </div>
      ) : (
        <Select value={selectedBarberId} onChange={handleChange}>
          {barbers.map((barber) => (
            <MenuItem key={barber.barberId} value={barber.barberId}>
              {barber.name}
            </MenuItem>
          ))}
        </Select>
      )}
    </div>
  );
}

export default Step1;

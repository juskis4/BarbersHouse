import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Step1() {
  const [selected, setSelected] = React.useState(' ');

  const handleChange = (event) => {
    setSelected(event.target.name);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox 
                checked={selected === 'gilad'} 
                onChange={handleChange} 
                name="gilad" 
              />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={selected === 'jason'} 
                onChange={handleChange} 
                name="jason" 
              />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={selected === 'antoine'} 
                onChange={handleChange} 
                name="antoine" 
              />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}

export default Step1;

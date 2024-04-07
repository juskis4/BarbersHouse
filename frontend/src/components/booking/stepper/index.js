import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState, useEffect } from 'react'; 
import Step1 from '../step1';
import Step2 from '../step2';

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const numSteps = 2;
  const [selectedBarberId, setSelectedBarberId] = React.useState('');
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBarbersWithServices = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:5037/Barbers/Services");
      setBarbers(res.data);
      setServices(res.data.flatMap(barber => barber.services));  
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBarbersWithServices(); 
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical" sx={{
        ".MuiStepLabel-iconContainer": {
          ".Mui-active": {
            color: "#99582a"
          },
          ".Mui-completed": {
            color: "#432818"
          },
          ".Mui-disabled": {
            color: "black"
          },
        },
        
        ".MuiButton-root":{
          backgroundColor: "transparent", 
          border: "2px solid #bc6c25",
          color: "#bc6c25",
          fontSize: "10px",
          fontWeight: 'bold',
        }
      }}>
       {/* Step 1 */}   
        <Step key={'Select a Barber'}>
          <StepLabel>Select a Barber</StepLabel>
          <StepContent>
            <Step1 
              barbers={barbers} 
              isLoading={isLoading} 
              selectedBarberId={selectedBarberId}
              onBarberChange={setSelectedBarberId}
            />
            <Box sx={{ mb: 2 }}>
              <div>
                <Button
                  variant="contained"
                  onClick={() => handleNext()} // Modified
                  sx={{ mt: 1, mr: 1 }}
                >
                  {activeStep === 1 ? 'Finish' : 'Continue'} 
                </Button>
                <Button
                  disabled={activeStep === 0}
                  onClick={() => handleBack()} // Modified
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>

        {/* Step 2 */}
        <Step key={'Select a Service'}>
          <StepLabel>Select a Service</StepLabel>
          <StepContent>
            <Step2 services={services} selectedBarberId={selectedBarberId} /> 
            <Box sx={{ mb: 2 }}>
              <div>
                <Button
                  variant="contained"
                  onClick={() => handleNext()} 
                  sx={{ mt: 1, mr: 1 }}
                >
                  {activeStep === 1 ? 'Finish' : 'Continue'} 
                </Button>
                <Button
                  disabled={activeStep === 0}
                  onClick={() => handleBack()} 
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>
      </Stepper>
      {activeStep === numSteps && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you're finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Book
          </Button>
        </Paper>
      )}
    </Box>
  );
}
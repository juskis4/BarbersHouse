import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react'; 
import { getBarbersWithServices } from '../../../services/bookingService';
import Step1 from '../step1';
import Step2 from '../step2';
import Step3 from '../step3';
import Step4 from '../step4';

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const numSteps = 4;

  const [selectedBarberId, setSelectedBarberId] = React.useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBarbersAndServices = async () => {
      setIsLoading(true);
      try {
        const data = await getBarbersWithServices(); 
        setBarbers(data);
        setServices(data.flatMap(barber => barber.services));
      } catch (err) {
        console.error("Error fetching data:", err); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchBarbersAndServices();
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
          "&:hover": {
            borderColor: "#bc6c25"
          }
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
                  onClick={() => handleNext()} 
                  sx={{ mt: 1, mr: 1 }}
                  disabled={selectedBarberId === ''}
                >
                  Continue
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

        {/* Step 2 */}
          <Step key={'Select a Service'}>
            <StepLabel>Select a Service</StepLabel>
            <StepContent>
              <Step2 
                services={services} 
                selectedBarberId={selectedBarberId}
                selectedServices={selectedServices} 
                setSelectedServices={setSelectedServices}
                selectedRows={selectedRows} 
                setSelectedRows={setSelectedRows} 
              /> 
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => handleNext()} 
                    sx={{ mt: 1, mr: 1 }}
                    disabled={selectedServices.length === 0}
                    >
                    Continue
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
        
        {/* Step 3 */}
        <Step key={'Pick a date and time'}> 
          <StepLabel>Pick a date and time</StepLabel>
          <StepContent>
            <Step3 
              selectedBarberId={selectedBarberId}
              selectedServices={selectedServices}
              selectedTimeSlot={selectedTimeSlot}
              onSlotSelected={setSelectedTimeSlot}  
            /> 
            <Box sx={{ mb: 2 }}>
              <div>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                  disabled={selectedTimeSlot === null} 
                >
                  Continue
                </Button>
                <Button   
                  disabled={activeStep === 0}
                  onClick={handleBack} 
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>

        {/* Step 4 */}
        <Step key={'Enter Details'}> 
          <StepLabel>Enter Details</StepLabel>
          <StepContent>
            <Step4 
              selectedBarberId={selectedBarberId}
              selectedServices={selectedServices}
              selectedTimeSlot={selectedTimeSlot}  
            /> 
            <Box sx={{ mb: 2 }}>
              <div>
                <Button   
                  disabled={activeStep === 0}
                  onClick={handleBack} 
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
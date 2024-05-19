import * as React from 'react';
import "./index.css";
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import axios from 'axios';
import Booking from '../booking';
import { useState, useEffect } from 'react';

function Barbers() {
  const [selectedBarberId, setSelectedBarberId] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [barbers, setBarbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const getBarbersWithServices = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("https://api-zdmjnhdz7q-ew.a.run.app/Barbers/Services");
      console.log('Barbers data fetched:', res.data);
      setBarbers(res.data);
      setSelectedBarberId(res.data[0]?.barberId || null);
    } catch (err) {
      console.log('Error fetching barbers data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBarbersWithServices();
  }, []);

  const handleBarberSelect = (barberId) => {
    setSelectedBarberId(barberId);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleServiceSelect = (barber, service) => {
    setSelectedBarberId(barber.barberId);
    setSelectedService(service);
    setOpen(true);
  };

  const SelectedBarberServices = ({ barber }) => {
    return (
      <div className="services-list">
        <ul>
          {barber.services.map((service) => (
            <li key={service.serviceId} className="service-item">
              <div>
                <div className="service-title">{service.title}</div>
                <div className="service-description">{service.description}</div>
              </div>
              <div className="service-price">{service.price} kr</div>
              <button
                className="service-select-btn"
                onClick={() => handleServiceSelect(barber, service)}
              >
                Select
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section id="services" className="services-container">
      <div className="services-content">
        <h2 className="services-header">Services</h2>
        <div className="services-tabs">
          {barbers.map((barber) => (
            <button
              key={barber.barberId}
              className={`services-tab ${selectedBarberId === barber.barberId ? 'active' : ''}`}
              onClick={() => handleBarberSelect(barber.barberId)}
            >
              {barber.name}
            </button>
          ))}
        </div>
        {isLoading ? (
          <div style={{ width: '100%', textAlign: 'center', marginTop: 20 }}>
            <CircularProgress />
          </div>
        ) : (
          barbers
            .filter((barber) => barber.barberId === selectedBarberId)
            .map((barber) => (
              <div key={barber.barberId}>
                <SelectedBarberServices barber={barber} />
              </div>
            ))
        )}
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Booking</DialogTitle>
        <DialogContent>
          <Booking 
            selectedBarber={barbers.find(barber => barber.barberId === selectedBarberId)}
            selectedService={selectedService}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default Barbers;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

const DatePicker = ({ selectedBarberId, selectedServices }) => {
  const connectionRef = useRef(null);
  const [connectionEstablished, setConnectionEstablished] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [error, setError] = useState(null);

  const establishConnection = useCallback(async () => { 
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5037/bookinghub")
      .build();

    connectionRef.current = connection; 

    try {
      await connection.start();
      console.log('Connected!'); 
      setConnectionEstablished(true);

      connection.on("ReceiveAvailableTimeSlots", setTimeSlots); 
    } catch (err) {
      console.error(err);
      setError('Error connecting to SignalR hub.');
    } 
  }, []); 

  useEffect(() => {
    const timer = setTimeout(establishConnection, 1000); // Add a 1-second delay 
    return () => clearTimeout(timer); // Cleanup
  }, [establishConnection]);  

  const handleGetTimeSlots = useCallback(async () => {
    if (!connectionRef.current) return;

    try {
      const serviceIds = selectedServices.map(service => service.serviceId);
      await connectionRef.current.invoke("GetTimeSlots", parseInt(selectedBarberId, 10), serviceIds);
    } catch (err) {
      console.error(err);
      setError('Error getting time slots.');
    }
  }, [selectedBarberId, selectedServices]);

  return (
    <div>
      {connectionEstablished ? ( 
        <button onClick={handleGetTimeSlots} disabled={!selectedBarberId || !selectedServices.length}>
          Get Time Slots
        </button>
      ) : (
        <p>Establishing connection...</p> 
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="time-slot-list">
        {timeSlots.map((slot, index) => (
          <div key={index}>
            {slot.startTime} - {slot.endTime}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;

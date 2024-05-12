import React, { useState, useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

const BookingTest = ({ selectedBarberId, selectedServices }) => {
  const connectionRef = useRef(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const establishConnection = async () => {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5037/bookinghub")
        .build();

      connectionRef.current = connection;

      try {
        await connection.start();
        console.log('Connected!');

        // listener for time slot responses
        connection.on("ReceiveAvailableTimeSlots", (slots) => {
          setTimeSlots(slots);
        });
      } catch (err) {
        console.error(err);
        setError('Error connecting to SignalR hub.');
      }
    };

    establishConnection();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  const handleGetTimeSlots = async () => {
    if (!connectionRef.current) {
      console.warn('Connection not yet established.');
      return;
    }

    try {
        console.log("Selected Barber ID:", selectedBarberId);
        console.log("Selected service ID:", selectedServices);
        console.log("Passed barber id:", parseInt(selectedBarberId, 10));
        const serviceIds = selectedServices.map(service => service.serviceId);
        console.log("Passed service id:", serviceIds);
        await connectionRef.current.invoke("GetTimeSlots", parseInt(selectedBarberId, 10), serviceIds);
    } 
    catch (err) {
      console.error(err);
      setError('Error getting time slots.');
    }
  };

  return (
    <div>
      <button onClick={handleGetTimeSlots } disabled={!selectedBarberId || !selectedServices.length} >
        Get Time Slots
      </button>

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

export default BookingTest;
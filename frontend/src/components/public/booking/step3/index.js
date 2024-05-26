import React, { useState, useEffect, useRef, useCallback } from "react";
import { Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CircularProgress from "@mui/material/CircularProgress";
import * as signalR from "@microsoft/signalr";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import CalendarCarousel from "./calendarCarousel";

const apiUrl = process.env.REACT_APP_API_KEY;

const Step3 = ({
  selectedServices,
  selectedBarberId,
  selectedTimeSlot,
  onSlotSelected,
}) => {
  const connectionRef = useRef(null);
  const [connectionEstablished, setConnectionEstablished] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleGetTimeSlotsRef = useRef(null);
  // SignalR connection
  const establishConnection = useCallback(async () => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiUrl}/bookinghub`)
      .configureLogging(signalR.LogLevel.Error)
      .build();

    connectionRef.current = connection;
    connection.logging = false;

    try {
      await connection.start();
      setConnectionEstablished(true);

      connectionRef.current.on("ReceiveAvailableTimeSlots", setTimeSlots);

      connectionRef.current.on("BookingChanged", async () => {
        //SignalR will trigger this callback whenever there is an update to the bookings
        const currentHandleGetTimeSlots = handleGetTimeSlotsRef.current;
        await currentHandleGetTimeSlots();
      });
    } catch (err) {
      console.error(err);
      setError("Error connecting to SignalR hub.");
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(establishConnection, 1000); // 1 second delay
    return () => clearTimeout(timer); // Cleanup
  }, [establishConnection]);

  // Function to call the GetTimeSlotsForDate from the webapi signalR hub
  const handleGetTimeSlots = useCallback(async () => {
    if (!connectionRef.current) return;

    try {
      setIsLoading(true);

      const serviceIds = selectedServices.map((service) => service.serviceId);
      const formattedDate = selectedDate.format("YYYY-MM-DD");

      await connectionRef.current.invoke(
        "GetTimeSlotsForDate",
        parseInt(selectedBarberId, 10),
        serviceIds,
        formattedDate,
      );
    } catch (err) {
      console.error(err);
      setError("Error getting time slots.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedBarberId, selectedServices, selectedDate]);

  useEffect(() => {
    handleGetTimeSlotsRef.current = handleGetTimeSlots;
  }, [handleGetTimeSlots]);

  useEffect(() => {
    if (connectionEstablished && selectedServices.length > 0) {
      handleGetTimeSlots();
    }
  }, [connectionEstablished, selectedServices, handleGetTimeSlots]);

  // date update
  const handleDateSelected = (date) => {
    setSelectedDate(date);
    handleGetTimeSlots();
  };

  // Time slot selection
  const handleTimeSlotClick = (slot) => {
    selectedTimeSlot = slot;
    onSlotSelected(slot);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      {selectedServices.length === 0 ? (
        <p>No services selected.</p>
      ) : (
        <ul>
          {selectedServices.map((service) => (
            <li key={service.serviceId}>
              {service.title} - ${service.price} ({service.duration} min)
            </li>
          ))}
        </ul>
      )}
      {connectionEstablished ? (
        <CalendarCarousel onDateSelected={handleDateSelected} />
      ) : (
        <Typography variant="body2">{error || "Connecting..."}</Typography>
      )}

      {isLoading ? (
        <CircularProgress />
      ) : timeSlots != null ? (
        <ButtonGroup
          variant="outline"
          aria-label="available time slots"
          sx={{
            maxWidth: 400,
            marginTop: 2,
            marginBottom: 2,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            "& .MuiButton-root": {
              minWidth: 0,
              margin: "0 4px 4px 0",
            },
          }}
        >
          {timeSlots.map((slot) => (
            <Button
              sx={{
                ".MuiButton-root&:focus": {
                  color: "white",
                  backgroundColor: "#bc6c25",
                },
              }}
              key={slot.startTime}
              className="time-slot-button"
              onClick={() => handleTimeSlotClick(slot)}
              variant={selectedTimeSlot === slot ? "contained" : "outlined"}
            >
              {dayjs(slot.startTime).utc().format("HH:mm")}
            </Button>
          ))}
        </ButtonGroup>
      ) : (
        <Typography variant="body2">No available slots</Typography>
      )}
    </Box>
  );
};

Step3.propTypes = {
  selectedServices: PropTypes.arrayOf(
    PropTypes.shape({
      serviceId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      duration: PropTypes.number,
      price: PropTypes.number.isRequired,
      description: PropTypes.string,
      barberId: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Step3;

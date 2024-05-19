import React, { useState, useEffect } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  Month,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import { getBookings } from "../../../services/bookingService.js";
import { Paper } from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const Scheduler = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const eventSettings = {
    dataSource: bookings.map((booking) => ({
      // Map to add calculated endTime
      ...booking,
      endTime: dayjs(booking.bookingDateTime)
        .add(booking.duration, "minute")
        .toDate(), // Add duration (in minutes) to startTime
    })),
    fields: {
      id: "bookingId",
      subject: { name: "serviceTitle" },
      startTime: { name: "bookingDateTime" },
      endTime: { name: "endTime" }, // endTime field is now calculated
    },
  };

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <ScheduleComponent
        height={500}
        eventSettings={eventSettings}
        showWeekNumber={true}
      >
        <Inject services={[Day, Week, Month]} />
      </ScheduleComponent>
    </Paper>
  );
};

export default Scheduler;

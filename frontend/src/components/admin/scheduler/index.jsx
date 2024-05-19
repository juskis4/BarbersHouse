import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  TimelineViews,
  TimelineMonth,
  Day,
  Week,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
  ResourcesDirective,
  ResourceDirective,
} from "@syncfusion/ej2-react-schedule";
import { getBookings } from "../../../services/bookingService.js";
import { getAllBarbers } from "../../../services/barberService.js";
import dayjs from "dayjs";

const Scheduler = () => {
  const [bookings, setBookings] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const today = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsData = await getBookings();
        const barbersData = await getAllBarbers();
        console.log(barbersData);
        setBookings(
          bookingsData.map((booking) => ({
            ...booking,
            bookingDateTime: new Date(booking.bookingDateTime),
            endTime: new Date(
              dayjs(booking.bookingDateTime).add(booking.duration, "minute"),
            ),
          })),
        );
        setBarbers(barbersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Transform barbers to categoryData
  const categoryData = barbers.map((barber) => ({
    text: barber.name,
    id: barber.barberId,
    color: getRandomColor(),
  }));

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const eventSettings = {
    dataSource: bookings,
    fields: {
      id: "bookingId",
      subject: { name: "serviceTitle" },
      startTime: { name: "bookingDateTime" },
      endTime: { name: "endTime" },
      resourceId: "barberId",
    },
  };

  return (
    <ScheduleComponent
      height={500}
      selectedDate={today}
      timezone={"UTC"}
      eventSettings={eventSettings}
      currentView="TimelineDay"
      group={{ resources: ["Barbers"] }}
    >
      <ResourcesDirective>
        <ResourceDirective
          field="barberId"
          title="Barber"
          name="Barbers"
          allowMultiple={true}
          dataSource={categoryData}
          textField="text"
          idField="id"
          colorField="color"
        />
      </ResourcesDirective>
      <ViewsDirective>
        <ViewDirective
          displayName="Day"
          option="TimelineDay"
          startHour="06:00"
          endHour="24:00"
          timeScale={{ interval: 60, slotCount: 3 }}
        />
        <ViewDirective option="Week" startHour="06:00" endHour="24:00" />
        <ViewDirective option="TimelineMonth" displayName="Month" />
        <ViewDirective option="Agenda" />
      </ViewsDirective>
      <Inject
        services={[
          Day,
          Week,
          TimelineViews,
          TimelineMonth,
          Agenda,
          Resize,
          DragAndDrop,
        ]}
      />
    </ScheduleComponent>
  );
};

export default Scheduler;

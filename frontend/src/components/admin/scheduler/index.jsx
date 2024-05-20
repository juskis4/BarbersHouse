import * as React from "react";
import { useState, useEffect, useRef } from "react";
import "./index.css";

import {
  getBookings,
  cancelBooking,
} from "../../../services/bookingService.js";
import { getAllBarbers } from "../../../services/barberService.js";

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
  ResourcesDirective,
  ResourceDirective,
} from "@syncfusion/ej2-react-schedule";
import { Internationalization, registerLicense } from "@syncfusion/ej2-base";
import { CircularProgress, Typography, IconButton } from "@mui/material";
import dayjs from "dayjs";
import CancelIcon from "@mui/icons-material/Cancel";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useSnackbar } from "notistack";

const licenseKey = process.env.SYNCFUSION_LICENSE_KEY;
registerLicense(licenseKey);

const Scheduler = () => {
  const [bookings, setBookings] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [refreshKey, setRefreshKey] = useState(0);

  const today = new Date();
  const intl = new Internationalization();
  let scheduleObj = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const bookingsData = await getBookings();
        const barbersData = await getAllBarbers();
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
        setError("Error fetching data, try again.");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
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

  const getHeaderStyles = (data) => {
    if (data.elementType === "cell") {
      return { alignItems: "center", color: "#919191" };
    } else {
      const resource = scheduleObj.current.getResourceCollections()[0];
      const resourceData = resource.dataSource.filter(
        (resource) => resource.id === data.barberId,
      )[0];
      return { background: resourceData?.color, color: "#FFFFFF" };
    }
  };

  const getHeaderDetails = (data) => {
    if (!data || !data.bookingDateTime || !data.endTime) {
      return "";
    }
    if (!data.bookingDateTime || !data.endTime) {
      return "";
    }

    return (
      intl.formatDate(data.bookingDateTime, {
        type: "date",
        skeleton: "full",
      }) +
      " (" +
      intl.formatDate(data.bookingDateTime, { skeleton: "hm" }) +
      " - " +
      intl.formatDate(data.endTime, { skeleton: "hm" }) +
      ")"
    );
  };

  const headerTemplate = (props) => {
    return (
      <div className="quick-info-header">
        <div
          className="quick-info-header-content"
          style={getHeaderStyles(props)}
        >
          <div className="quick-info-title">Booking Details</div>
          <div className="duration-text">{getHeaderDetails(props)}</div>
        </div>
      </div>
    );
  };

  const contentTemplate = (props) => {
    return (
      <div className="event-content">
        <div className="eventcontent-type-wrap">
          <label>Service: </label> <span> {props.serviceTitle}</span>
        </div>
        <div className="eventcontent-type-wrap">
          <label>Service ID: </label> <span>{props.serviceId}</span>
        </div>
        <div className="eventcontent-type-wrap">
          <label>Customer Name: </label>
          <span>{props.customerName}</span>
        </div>
        <div className="eventcontent-type-wrap">
          <label>Phone Number:</label> <span></span>
        </div>
        <div className="eventcontent-type-wrap">
          <label>Status:</label> <span>{props.status}</span>
        </div>
      </div>
    );
  };

  const footerTemplate = (props) => {
    return <EventFooter data={props} />;
  };

  const EventFooter = ({ data }) => {
    // Separate component for footer buttons
    const scheduleObj = useRef();

    const handleDelete = async () => {
      try {
        setError(null);
        const eventDetails = data;
        let currentAction = "Delete";
        await cancelBooking(eventDetails.barberId, eventDetails.bookingId);
        scheduleObj.current?.deleteEvent(eventDetails, currentAction);
        enqueueSnackbar("Booking canceled successfully.", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setBookings(
          bookings.filter((booking) => booking.bookingId !== data.bookingId),
        );
        setRefreshKey(refreshKey + 1);
      } catch (error) {
        setError("Error while cancelling a booking.");
        console.log(error);
      }
    };

    return (
      <div className="quick-info-footer">
        <div className="event-footer">
          <IconButton aria-label="edit" onClick={handleDelete} size="small">
            Edit
            <EditNoteIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={handleDelete}
            size="small"
            color="error"
          >
            Cancel
            <CancelIcon />
          </IconButton>
        </div>
      </div>
    );
  };

  const eventSettings = {
    dataSource: bookings,
    fields: {
      id: "bookingId",
      subject: { name: "customerName" },
      startTime: { name: "bookingDateTime" },
      endTime: { name: "endTime" },
      resourceId: "barberId",
    },
  };

  return (
    <div>
      {error && <Typography color="error">{error}</Typography>}
      <ScheduleComponent
        height={500}
        key={refreshKey}
        selectedDate={today}
        timezone={"UTC"}
        eventSettings={eventSettings}
        currentView="TimelineDay"
        ref={scheduleObj}
        group={{ resources: ["Barbers"] }}
        quickInfoTemplates={{
          header: headerTemplate.bind(this),
          content: contentTemplate.bind(this),
          footer: footerTemplate.bind(this),
        }}
        actionComplete={async () => {
          // Refetch bookings after action is completed
          const bookingsData = await getBookings();
          setBookings(
            bookingsData.map((booking) => ({
              ...booking,
              bookingDateTime: new Date(booking.bookingDateTime),
              endTime: new Date(
                dayjs(booking.bookingDateTime).add(booking.duration, "minute"),
              ),
            })),
          );
        }}
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
        {isLoading ? (
          <CircularProgress />
        ) : (
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
        )}
        <Inject services={[Day, Week, TimelineViews, TimelineMonth, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};

export default Scheduler;

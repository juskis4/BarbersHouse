import * as React from "react";
import { useState, useEffect, useRef } from "react";
import "./index.css";

import { getBookings } from "../../../services/bookingService.js";
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
import { Button, CircularProgress, Typography } from "@mui/material";
import dayjs from "dayjs";

const licenseKey = process.env.SYNCFUSION_LICENSE_KEY;
registerLicense(licenseKey);

const Scheduler = () => {
  const [bookings, setBookings] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
    return (
      <div className="quick-info-footer">
        {props.elementType === "cell" ? (
          <div className="cell-footer">
            <Button
              type="submit"
              aria-label="edit"
              // onClick={buttonClickActions.bind(this)}
              size="small"
              color="primary"
              sx={{
                minWidth: "70px",
                minHeight: "25px",
                margin: "10px 10px 5px 0",
                fontSize: "0.8rem",
                textTransform: "none",
              }}
              variant="contained"
              disabled={true}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              aria-label="edit"
              size="small"
              color="primary"
              sx={{
                minWidth: "70px",
                minHeight: "25px",
                margin: "10px 10px 5px 0",
                fontSize: "0.8rem",
                textTransform: "none",
              }}
              variant="contained"
              disabled={true}
            >
              Edit
            </Button>
          </div>
        ) : (
          <div className="event-footer">
            <Button
              type="submit"
              aria-label="edit"
              // onClick={buttonClickActions.bind(this)}
              size="small"
              color="primary"
              sx={{
                minWidth: "70px",
                minHeight: "25px",
                margin: "10px 10px 5px 0",
                fontSize: "0.8rem",
                textTransform: "none",
              }}
              variant="contained"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              aria-label="edit"
              // onClick={buttonClickActions.bind(this)}
              size="small"
              color="primary"
              sx={{
                minWidth: "70px",
                minHeight: "25px",
                margin: "10px 10px 5px 0",
                fontSize: "0.8rem",
                textTransform: "none",
              }}
              variant="contained"
              disabled={isLoading}
            >
              Edit
            </Button>
          </div>
        )}
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

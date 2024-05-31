import * as React from "react";
import { useState, useEffect, useRef } from "react";
import "./index.css";

import StatBox from "../barbers/statBox";
import {
  getBookings,
  cancelBooking,
  getStats,
} from "../../../services/bookingService.js";
import { getAllBarbers } from "../../../services/barberService.js";

// SYncfusion
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

// Material UI
import {
  CircularProgress,
  Typography,
  IconButton,
  Paper,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

// Icons
import CancelIcon from "@mui/icons-material/Cancel";
import EditNoteIcon from "@mui/icons-material/EditNote";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaidIcon from "@mui/icons-material/Paid";

import dayjs from "dayjs";
import { useSnackbar } from "notistack";

const licenseKey = process.env.REACT_APP_SYNCFUSION_LICENSE_KEY;
registerLicense(licenseKey);

const Scheduler = () => {
  const [bookings, setBookings] = useState([]);
  const [barbers, setBarbers] = useState([]);

  // Statistical data
  const [totalBookingsCurrentMonth, setTotalBookingsCurrentMonth] = useState(0);
  const [bookingPercentageChange, setBookingPercentageChange] = useState(0);
  const [currentMonthRevenue, setCurrentMonthRevenue] = useState(0);

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
        const statsData = await getStats();

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

        setTotalBookingsCurrentMonth(statsData.totalBookingsCurrentMonth);
        setBookingPercentageChange(statsData.bookingPercentageChange);
        setCurrentMonthRevenue(statsData.currentMonthRevenue);
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
          <label>Customer Email:</label> <span> {props.customerEmail} </span>
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
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid xs={12} sm={7} lg={3}>
          <Paper
            sx={{
              p: 2,
              mt: 2,
              display: "flex",
              flexDirection: "column",
              height: 60,
              alignItems: "center",
            }}
          >
            <StatBox
              title="Bookings"
              value={totalBookingsCurrentMonth}
              icon={<CalendarMonthIcon />}
              secondaryText="Current Month"
            />
          </Paper>
        </Grid>
        <Grid xs={12} sm={7} lg={3}>
          <Paper
            sx={{
              p: 2,
              mt: 2,
              display: "flex",
              flexDirection: "column",
              height: 60,
              alignItems: "center",
            }}
          >
            <StatBox
              title={bookingPercentageChange > 0 ? "Growth" : "Decline"}
              value={`${bookingPercentageChange.toFixed(2)}%`}
              icon={<TrendingUpIcon />}
              secondaryText="Compared to Last Month"
            />
          </Paper>
        </Grid>
        <Grid xs={12} sm={7} lg={3}>
          <Paper
            sx={{
              p: 2,
              mt: 2,
              display: "flex",
              flexDirection: "column",
              height: 60,
              alignItems: "center",
            }}
          >
            <StatBox
              title="DKK "
              value={`${currentMonthRevenue}`}
              icon={<PaidIcon sx={{ color: "secondary", fontSize: "32px" }} />}
              secondaryText="Current Month"
            />
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
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
                  dayjs(booking.bookingDateTime).add(
                    booking.duration,
                    "minute",
                  ),
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
          <Inject
            services={[Day, Week, TimelineViews, TimelineMonth, Agenda]}
          />
        </ScheduleComponent>
      </Box>
    </div>
  );
};

export default Scheduler;

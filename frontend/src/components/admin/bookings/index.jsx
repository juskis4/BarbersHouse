import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import {
  deleteBooking,
  getBookings,
} from "../../../services/bookingService.js";

dayjs.extend(utc);
const Bookings = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDeleteBooking = async (barberId, bookingId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this booking? This action cannot be undone.",
      )
    ) {
      try {
        await deleteBooking(barberId, bookingId);
        setRows((prevRows) =>
          prevRows.filter((row) => row.bookingId !== bookingId),
        );
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Error deleting booking. Try again");
      }
    }
  };

  const columns = [
    { field: "booking_id", headerName: "ID", width: 50 },
    {
      field: "barberName",
      flex: 1,
      headerName: "Barber",
      type: "string",
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "serviceTitle",
      flex: 1,
      headerName: "Service",
      type: "string",
    },
    {
      field: "status",
      headerName: "Status",
      type: "string",
      flex: 1,
    },
    {
      field: "bookingDateTime",
      headerName: "Date & Time",
      width: 120,
      type: "dateTime",
      valueGetter: (value) => value && new Date(value),
      valueFormatter: (value) => {
        if (!value) return "";
        return dayjs(value).utc().format("YYYY-MM-DD HH:mm");
      },
    },
    {
      field: "view",
      headerName: "",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnFilter: true,
      renderCell: (params) => (
        <Button component={Link} to={`/admin/bookings/${params.row.bookingId}`}>
          View
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnFilter: true,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          sx={{
            backgroundColor: "transparent",
            color: "redAccent.main",
            "&:hover": {
              backgroundColor: "redAccent.main",
              color: "white",
            },
          }}
          onClick={() =>
            handleDeleteBooking(params.row.barberId, params.row.bookingId)
          }
        >
          Delete
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getBookings();
        const bookingsWithDates = data.map((booking) => ({
          ...booking,
          bookingDateTime: booking.bookingDateTime
            ? new Date(booking.bookingDateTime)
            : null,
        }));
        setRows(bookingsWithDates);
      } catch (error) {
        console.error(error);
        setError("Error fetching bookings data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Box m="20px">
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      ) : (
        <Box m="20px 0 0 0" height="auto">
          <DataGrid
            checkboxSelection
            rows={rows}
            columns={columns}
            getRowId={(row) => row.bookingId}
          />
        </Box>
      )}
    </Box>
  );
};

export default Bookings;

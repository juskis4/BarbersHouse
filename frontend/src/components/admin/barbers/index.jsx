import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { getAllBarbers } from "../../../services/barberService.js";

const Barbers = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = [
    { field: "barber_id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      flex: 1,
      headerName: "Email",
      type: "string",
    },
    {
      field: "action",
      headerName: "",
      flex: 1,
      headerAlign: "right",
      align: "right",
      sortable: false,
      renderCell: (params) => (
        <Button component={Link} to={`/admin/barbers/${params.row.barberId}`}>
          View Profile
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBarbers();
        setRows(data);
      } catch (error) {
        console.error(error);
        setError("Error fetching barbers data");
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
            getRowId={(row) => row.barberId}
          />
        </Box>
      )}
    </Box>
  );
};

export default Barbers;

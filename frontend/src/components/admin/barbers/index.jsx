import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import {
  getAllBarbers,
  deleteBarber,
} from "../../../services/barberService.js";
import ConfirmationDialog from "../confirmDialog";

const Barbers = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [barberToDelete, setBarberToDelete] = useState(null);

  const handleDeleteBarber = async (barberId) => {
    setBarberToDelete(barberId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setBarberToDelete(null);
  };

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
      field: "view",
      headerName: "",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <Button component={Link} to={`/admin/barbers/${params.row.barberId}`}>
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
          onClick={() => handleDeleteBarber(params.row.barberId)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleConfirmDelete = async () => {
    try {
      await deleteBarber(barberToDelete);

      const updatedRows = rows.filter((row) => row.barberId !== barberToDelete);
      setRows(updatedRows);

      handleCloseDialog();
    } catch (error) {
      console.error(error);
      setError("Error deleting barber. Try again");
    }
  };

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
      <ConfirmationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        contentText="Are you sure you want to delete this barber? This action cannot be undone."
      />
    </Box>
  );
};

export default Barbers;

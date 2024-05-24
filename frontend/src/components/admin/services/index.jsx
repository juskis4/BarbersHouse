import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmationDialog from "../confirmDialog";
import { getServices } from "../../../services/servicesService";

const Services = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const handleDeleteService = (serviceId) => {
    setServiceToDelete(serviceId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setServiceToDelete(null);
  };

  const columns = [
    { field: "serviceId", headerName: "ID", width: 50 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "duration", headerName: "Duration (min)", width: 120 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "barbersName", headerName: "Barber", flex: 1 },
    {
      field: "view",
      headerName: "",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnFilter: true,
      renderCell: (params) => (
        <Button component={Link} to={`/admin/services/${params.row.serviceId}`}>
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
          onClick={() => handleDeleteService(params.row.serviceId)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleConfirmDelete = async () => {
    try {
      // await deleteService(serviceToDelete);

      const updatedRows = rows.filter(
        (row) => row.serviceId !== serviceToDelete,
      );
      setRows(updatedRows);
      handleCloseDialog();
    } catch (error) {
      console.error(error);
      setError("Error deleting service. Try again");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getServices();
        setRows(data);
      } catch (error) {
        console.error(error);
        setError("Error fetching services data");
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
            rows={rows}
            columns={columns}
            getRowId={(row) => row.serviceId}
          />
        </Box>
      )}

      <ConfirmationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        contentText="Are you sure you want to delete this service? This action cannot be undone."
      />
    </Box>
  );
};

export default Services;

import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Services = ({ services }) => {
  const columns = [
    { field: "service_id", headerName: "ID", type: "number" },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "title-column--cell",
    },
    {
      field: "duration",
      headerName: "Duration (min.)",
      type: "number",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
    },
    {
      field: "action",
      headerName: "",
      flex: 1,
      headerAlign: "right",
      align: "right",
      sortable: false,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/admin/services/${params.row.serviceId}/`}
        >
          View Service
        </Button>
      ),
    },
  ];

  return (
    <Box>
      {!services || services.length === 0 ? (
        <Typography variant="h6">No services found</Typography>
      ) : (
        <Box m="20px 0 0 0" height="auto">
          <DataGrid
            checkboxSelection
            rows={services}
            columns={columns}
            getRowId={(row) => row.serviceId}
          />
        </Box>
      )}
    </Box>
  );
};

export default Services;

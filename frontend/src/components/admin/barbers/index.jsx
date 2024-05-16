import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataBarbers } from "../../../data/mockData.js";

const Barbers = () => {
  const columns = [
    { field: "barber_id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "bio",
      headerName: "Bio",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
  ];

  return (
    <Box m="20px">
      <Box m="40px 0 0 0" height="auto">
        <DataGrid
          checkboxSelection
          rows={mockDataBarbers}
          columns={columns}
          getRowId={(row) => row.barber_id}
        />
      </Box>
    </Box>
  );
};

export default Barbers;

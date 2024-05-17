import { Box, Typography } from "@mui/material";

const StatBox = ({ title, icon, bookings }) => {
  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>{icon}</Box>
        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: "greenAccent.main" }}
          >
            {bookings} {title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;

import { Box, Typography } from "@mui/material";

const StatBox = ({ title, value, icon, secondaryText }) => (
  <Box width="100%" m="0 30px">
    <Box display="flex" justifyContent="space-between">
      <Box>{icon}</Box>
      <Box>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "greenAccent.main" }}
        >
          {value} {title}
        </Typography>
        {secondaryText && (
          <Typography variant="body2" color="textSecondary">
            {secondaryText}
          </Typography>
        )}
      </Box>
    </Box>
  </Box>
);

export default StatBox;

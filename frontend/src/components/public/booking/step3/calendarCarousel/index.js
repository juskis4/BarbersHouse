
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography } from "@mui/material";
import dayjs from "dayjs";

function CalendarCarousel({ onDateSelected }) {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const handleDateChange = (newIndex) => {
    const newDate = dayjs().add(newIndex, "day");
    setCurrentDate(newDate);
    onDateSelected(newDate); 
  };

  return (
    <Carousel
      value={currentDate.diff(dayjs(), "day")}
      onChange={handleDateChange}
      navButtonsAlwaysVisible={true}
      autoPlay={false}
      sx={{ 
        "& .MuiPaper-root": { padding: "16px", textAlign: "center" } }}
    >
        {[...Array(7)].map((_, index) => {
        const date = dayjs().add(index, "day");

        return (
          <Paper key={date.format("YYYY-MM-DD")}>
            <Typography variant="h6">{date.format("ddd")}</Typography>
            <Typography variant="subtitle1">{date.format("DD")}</Typography>
            <Typography variant="body2">{date.format("MMM")}</Typography>
          </Paper>
        );
      })}
    </Carousel>
  );
}

export default CalendarCarousel;

import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

//const apiUrl = process.env.REACT_APP_API_KEY;
const apiUrl = "https://api-zdmjnhdz7q-ew.a.run.app";

export async function createBooking(bookingData) {
  try {
    const bookingDataWithUtcTime = {
      ...bookingData,
      StartTime: dayjs(bookingData.StartTime).utc().toISOString(),
    };

    const response = await axios.post(
      `${apiUrl}/Bookings/${bookingData.BarberId}/bookings`,
      bookingDataWithUtcTime,
    );

    if (response.status === 200) {
      return response.data;
    } else {
      const errorData = response.data;
      throw new Error(errorData.message || "Error creating booking");
    }
  } catch (err) {
    console.error("Error while creating a booking:", err);
    if (err.response) {
      throw new Error(
        `Server responded with ${err.response.status}: ${err.response.data.message || err.response.data}`,
      );
    } else {
      throw new Error("Network Error: Unable to reach the API server.");
    }
  }
}

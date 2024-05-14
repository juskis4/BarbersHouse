import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const apiUrl = "https://api-zdmjnhdz7q-ew.a.run.app"; 

export async function getBarbersWithServices() {
  try {
    const res = await axios.get(`${apiUrl}/Barbers/Services`);
    return res.data;
  } catch (err) {
    console.error("Error fetching barbers and services:", err);
    throw err; 
  }
}

export async function createBooking(bookingData) {
  try {
    const bookingDataWithUtcTime = {
      ...bookingData,
      StartTime: dayjs(bookingData.StartTime).utc().toISOString(),
    };

    const response = await axios.post(
      `${apiUrl}/Bookings/${bookingData.BarberId}/bookings`,
      bookingDataWithUtcTime
    );

    if (response.status === 200) {
      return response.data; 
    } else {
      const errorData = response.data;
      throw new Error(errorData.message || "Error creating booking");
    }
  } catch (error) {
    console.error("Error creating booking:", error);

    if (error.response) {
      throw new Error(`Server responded with ${error.response.status}: ${error.response.data.message || error.response.data}`);
    } else if (error.request) {
      throw new Error("No response received from the server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}
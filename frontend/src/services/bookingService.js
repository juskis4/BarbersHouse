import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const apiUrl = process.env.REACT_APP_API_KEY;

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

export async function getBookings(
  barberId = null,
  startDate = null,
  endDate = null,
) {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const params = {};
      if (barberId) {
        params.barberId = barberId;
      }
      if (startDate) {
        params.startDate = startDate.toISOString();
      }
      if (endDate) {
        params.endDate = endDate.toISOString();
      }

      const response = await axios.get(`${apiUrl}/Bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: params,
      });
      const formattedBookings = response.data.map((booking) => ({
        bookingId: booking.bookingId,
        barberId: booking.barberId,
        barberName: booking.barberName,
        customerId: booking.customerId,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        serviceId: booking.serviceId,
        serviceTitle: booking.serviceTitle,
        bookingDateTime: booking.bookingDateTime,
        status: booking.status,
        duration: booking.duration,
      }));

      return formattedBookings;
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

export async function cancelBooking(barberId, bookingId) {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const response = await axios.put(
        `${apiUrl}/Bookings/${barberId}/bookings/${bookingId}/cancel`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || "Error cancelling booking");
      }
    }
  } catch (error) {
    console.error("Error cancelling booking:", error);
    if (error.response) {
      throw new Error(
        `Server responded with ${error.response.status}: ${
          error.response.data.message || error.response.data
        }`,
      );
    } else {
      throw new Error("Error setting up the request");
    }
  }
}

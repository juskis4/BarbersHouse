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

export async function createManualBooking(bookingData) {
  try {
    const response = await axios.post(
      `${apiUrl}/Bookings/${bookingData.BarberId}/bookings`,
      bookingData,
    );

    if (response.status === 200) {
      return response.data;
    } else {
      const errorData = response.data;
      throw new Error(errorData.message || "Error creating a manual booking");
    }
  } catch (err) {
    console.error("Error while creating a manual booking:", err);
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

export async function deleteBooking(barberId, bookingId) {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const response = await axios.delete(
        `${apiUrl}/Bookings/${barberId}/bookings/${bookingId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 204) {
        return response.data;
      } else {
        throw new Error(response.data.message || "Error deleting booking");
      }
    }
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
}

export async function getBookingById(bookingId) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(`${apiUrl}/Bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    throw error;
  }
}

export async function updateBooking(bookingId, updatedBooking) {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const patchOperations = Object.keys(updatedBooking).map((key) => ({
        op: "replace",
        path: `/${key}`,
        value: updatedBooking[key],
      }));

      const response = await axios.patch(
        `${apiUrl}/Bookings/${bookingId}`,
        patchOperations,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json-patch+json",
          },
        },
      );

      return response.data;
    }
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}

export async function getStats() {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const response = await axios.get(`${apiUrl}/Bookings/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(
          response.data.message || "Error fetching booking statistics",
        );
      }
    }
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}

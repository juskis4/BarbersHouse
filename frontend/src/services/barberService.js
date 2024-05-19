import axios from "axios";

//const apiUrl = process.env.REACT_APP_API_KEY;
const apiUrl = "https://api-zdmjnhdz7q-ew.a.run.app";
export async function getBarbersWithServices() {
  try {
    const response = await axios.get(`${apiUrl}/Barbers/Services`);
    return response.data;
  } catch (error) {
    console.error("Error fetching barbers and services:", error);
    throw error;
  }
}

export async function getAllBarbers() {
  try {
    const response = await axios.get(`${apiUrl}/Barbers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching barbers:", error);
    throw error;
  }
}

export async function updateBarber(barberId, updatedBarber) {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const patchOperations = Object.keys(updatedBarber).map((key) => ({
        op: "replace",
        path: `/${key}`,
        value: updatedBarber[key],
      }));

      const response = await axios.patch(
        `${apiUrl}/Barbers/${barberId}`,
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
    console.error("Error updating barber:", error);
    throw error;
  }
}

export async function addBarber(newBarber) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.post(`${apiUrl}/Barbers`, newBarber, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error adding barber:", error);
    throw error;
  }
}

export async function deleteBarber(barberId) {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const response = await axios.delete(`${apiUrl}/Barbers/${barberId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error deleting a barber:", error);
    throw error;
  }
}

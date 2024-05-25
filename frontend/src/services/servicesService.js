import axios from "axios";

const apiUrl = process.env.REACT_APP_API_KEY;

export async function getServices() {
  try {
    const response = await axios.get(`${apiUrl}/Services`);
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}

export async function updateService(serviceId, updatedService) {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const patchOperations = Object.keys(updatedService).map((key) => ({
        op: "replace",
        path: `/${key}`,
        value: updatedService[key],
      }));

      const response = await axios.patch(
        `${apiUrl}/Services/${serviceId}`,
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
    console.error("Error updating service:", error);
    throw error;
  }
}

export async function addService(newService) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.post(`${apiUrl}/Services`, newService, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error adding services:", error);
    throw error;
  }
}

export async function deleteService(serviceId) {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const response = await axios.delete(`${apiUrl}/Services/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error deleting a service:", error);
    throw error;
  }
}

export async function getServiceById(serviceId) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(`${apiUrl}/Services/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching service by ID:", error);
    throw error;
  }
}

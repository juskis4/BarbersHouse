import axios from "axios";

//const apiUrl = process.env.REACT_APP_API_KEY;
const apiUrl = "https://api-zdmjnhdz7q-ew.a.run.app/";


export async function login(username, password) {
  try {
    const response = await axios.post(`${apiUrl}/api/AdminAuth/login`, {
      username,
      password,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      const errorData = response.data;
      throw new Error(errorData.message || "Error logging in");
    }
  } catch (err) {
    console.error("Error while logging in:", err);
    if (err.response) {
      throw new Error(
        `Server responded with ${err.response.status}: ${err.response.data.message || err.response.data}`,
      );
    } else {
      throw new Error("Network Error: Unable to reach the API server.");
    }
  }
}

import axios from 'axios';

const apiUrl = "http://localhost:5037/Barbers"; 

export async function getBarbersWithServices() {
  try {
    const res = await axios.get(`${apiUrl}/Services`);
    return res.data;
  } catch (err) {
    console.error("Error fetching barbers and services:", err);
    throw err; 
  }
}

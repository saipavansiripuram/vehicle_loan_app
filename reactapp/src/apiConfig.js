import axios from 'axios'

const BASE_URL = 'http://localhost:8080'; // Replace with your backend API



// GET request
const getData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// POST request
const postData = async (endpoint, data) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// PUT request
const putData = async (endpoint, data) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.put(`${BASE_URL}${endpoint}`, data, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};


const deleteData = async (endpoint) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.delete(`${BASE_URL}${endpoint}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return "response";
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

export { getData, postData, putData, deleteData };
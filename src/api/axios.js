import axios from 'axios';

const baseURL = 'http://192.168.1.11:8000';

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});



export default apiClient;

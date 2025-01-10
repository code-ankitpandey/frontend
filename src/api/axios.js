import axios from 'axios';
import { useLoader } from '../utils/LoaderContext';
const  baseURL = 'http://192.168.1.14:8000';

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const useApiClient = () => {
  const { showLoader, hideLoader } = useLoader();

  // Add a request interceptor
  apiClient.interceptors.request.use(
    (config) => {
      showLoader();
      return config;
    },
    (error) => {
      hideLoader();
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  apiClient.interceptors.response.use(
    (response) => {
      hideLoader();
      return response;
    },
    (error) => {
      hideLoader();
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default apiClient;

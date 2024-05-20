import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const httpService = axios.create({
  baseURL: BASE_URL,
});

//
export const httpInterceptorService = axios.create({
  baseURL: BASE_URL,
});

httpInterceptorService.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpInterceptorService.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

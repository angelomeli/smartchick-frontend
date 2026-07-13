import axios from 'axios';

const API = axios.create({
  baseURL: 'https://smartchick-backend.onrender.com/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
};

export const sensorService = {
  getLatest: (farm_id) => API.get('/sensors/latest', { params: { farm_id } }),
  getData: (id, params) => API.get(`/sensors/${id}/data`, { params }),
};

export const actuatorService = {
  getAll: (farm_id) => API.get('/actuators', { params: { farm_id } }),
  control: (id, data) => API.put(`/actuators/${id}/control`, data),
};

export const alertService = {
  getAll: (params) => API.get('/alerts', { params }),
  acknowledge: (id) => API.put(`/alerts/${id}/acknowledge`),
};

export default API;
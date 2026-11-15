import axios from 'axios';

const baseApiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5067/api/Tasks').replace(/\/Tasks\/?$/, '');

const api = axios.create({
  baseURL: `${baseApiUrl}/Tasks`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const pin = sessionStorage.getItem('owner_pin');
  if (pin) {
    config.headers['X-Owner-Pin'] = pin;
  }
  return config;
});

export const taskApi = {
  verifyPin: (pin) => axios.post(`${baseApiUrl}/Auth/verify`, { pin }),
  getAll: (params) => api.get('/', { params }),
  create: (data) => api.post('/', data),
  update: (id, data) => api.put(`/${id}`, data),
  updateStatus: (id, status) => api.patch(`/${id}/status`, { status }),
  delete: (id) => api.delete(`/${id}`),
};
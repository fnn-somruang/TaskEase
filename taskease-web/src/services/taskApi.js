import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5067/api/Tasks',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  getAll: (params) => api.get('/', { params }),
  create: (data) => api.post('/', data),
  update: (id, data) => api.put(`/${id}`, data),
  updateStatus: (id, status) => api.patch(`/${id}/status`, { status }),
  delete: (id) => api.delete(`/${id}`),
};
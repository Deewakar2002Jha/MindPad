import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

export const getNotes = (token) => api.get('/notes', { headers: { Authorization: `Bearer ${token}` } });
export const createNote = (data, token) => api.post('/notes', data, { headers: { Authorization: `Bearer ${token}` } });
export const updateNote = (id, data, token) => api.put(`/notes/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteNote = (id, token) => api.delete(`/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const adminLogin = (data) => api.post('/admin/login', data);
export const updateAdminProfile = (data, token) => api.put('/admin/profile', data, { headers: { Authorization: `Bearer ${token}` } });
export const getUsers = (token) => api.get('/admin/users', { headers: { Authorization: `Bearer ${token}` } });
export const getUserCount = (token) => api.get('/admin/user-count', { headers: { Authorization: `Bearer ${token}` } });
// Note: clerk delete user can be dangerous, but the requirement specifies it.
export const deleteUser = (id, token) => api.delete(`/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const banUser = (id, token) => api.put(`/admin/users/${id}/ban`, {}, { headers: { Authorization: `Bearer ${token}` } });

export default api;

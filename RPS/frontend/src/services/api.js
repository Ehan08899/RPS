import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://rps-xpww.vercel.app';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Members API
export const getMembers = () => api.get('/members');
export const createMember = (data) => api.post('/members', data);
export const updateMember = (id, data) => api.put(`/members/${id}`, data);
export const deleteMember = (id) => api.delete(`/members/${id}`);

// Events API
export const getEvents = (month) => api.get('/events', { params: { month } });
export const createEvent = (data) => api.post('/events', data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);

// Attendance API
export const getAttendance = (month) => api.get('/attendance', { params: { month } });
export const updateAttendance = (data) => api.post('/attendance', data);

// Export API
export const exportExcel = (month, jabatan) => {
  return api.get('/export/excel', {
    params: { month, jabatan },
    responseType: 'blob'
  });
};

export default api;
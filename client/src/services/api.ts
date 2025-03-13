import axios from 'axios';

const api = axios.create({
  baseURL: 'https://resumeai-ws9l.onrender.com'
});

export default api;

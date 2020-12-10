import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.gobarber.danielbackes.dev',
});

export default api;

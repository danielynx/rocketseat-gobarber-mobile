import axios from 'axios';

const api = axios.create({
  baseURL: (__DEV__ ? 'http://localhost:3333' : 'https://api.gobarber.danielbackes.dev')
});

export default api;

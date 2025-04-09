import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.0.196:8000/api/',
  timeout: 5000,
});

export default API;

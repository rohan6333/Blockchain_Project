import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const registerUser = (data) => API.post('/register', data);
export const loginUser = (data) => API.post('/login', data);
export const fetchCredentials = (address) => API.get(`/credentials/${address}`);
export const verifyCredential = (data) => API.post('/credentials/verify', data);

export default API;

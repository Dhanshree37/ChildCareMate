import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Your backend URL

export const getUsers = () => axios.get(`${API_URL}/users`);
export const addUser = (user) => axios.post(`${API_URL}/users`, user);

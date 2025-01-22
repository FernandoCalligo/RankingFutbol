import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia el puerto según tu backend
});

export const fetchPlayers = () => API.get('/players');
export const createPlayer = (player) => API.post('/players', player);
export const createMatch = (match) => API.post('/matches', match);

export default API;

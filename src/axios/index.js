import axios from 'axios';

export const authAxios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
    Authorization: `${localStorage.getItem('token')}`,
  },
});

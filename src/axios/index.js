import axios from 'axios';

export const authAxios = axios.create({
  baseURL: 'https://petwif.store',
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
    Authorization: `${localStorage.getItem('token')}`,
  },
});

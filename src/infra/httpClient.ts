import { LOCAL_STORAGE_KEYS } from '@/constants/LOCAL_STORAGE_KEYS';
import axios from 'axios'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

httpClient.interceptors.request.use((req) => {
  const isProtected = req.headers['protected'];
  
  if (isProtected) {
    delete req.headers['protected'];
    
    const session = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION) ?? '{}');

    if (session.token) {
      req.headers.Authorization = `Bearer ${session.token}`;
    } else {
      throw Error();
    }
  }
  
  return req;
}, (error) => {
  // Tratamento de erro caso a requisição falhe
  return Promise.reject(error);
});
import { LOCAL_STORAGE_KEYS } from '@/constants/LOCAL_STORAGE_KEYS';
import axios from 'axios'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

httpClient.interceptors.request.use((req) => {
  const session = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION) ?? '{}');

  if (Object.keys(session).length > 0) {
    if (session.token) {
      req.headers.Authorization = `Bearer ${session.token}`;
    }
  }
  
  return req;
}, (error) => {
  return Promise.reject(error);
});

httpClient.interceptors.response.use((response) => response, (error) => {
  if (axios.isAxiosError(error)) {
    if (error.status === 500) {
      if (error.response?.data.message && error.response?.data.message === 'jwt expired') {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.SESSION);
        // Removido window.location.href = "/login" para evitar redirecionamento forçado
      }
    }
  }


  return Promise.reject(error);
});
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // Cambiar si se usa otro puerto o IP
//faltan endpoints
// para noticias, blogs y documentos
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const getTopNoticias = () => api.get('/noticias?top=3');
export const getAllNoticias = () => api.get('/noticias');
export const getTopBlogs = () => api.get('/blogs?top=3');
export const getAllBlogs = () => api.get('/blogs');
export const getAllDocuments = () => api.get('/documentos');
export const getDocumentById = (id: number) => api.get(`/documentos/${id}`);
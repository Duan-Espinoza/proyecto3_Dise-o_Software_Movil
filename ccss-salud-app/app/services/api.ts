import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // Cambia a tu IP si usas dispositivo físico

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Noticias
export const getTopNoticias = () => api.get('/noticias/top');
export const getAllNoticias = () => api.get('/noticias');
export const getNoticiaById = (id: number) => api.get(`/noticia/${id}`);

// Blogs
export const getTopBlogs = () => api.get('/blogs/top');
export const getAllBlogs = () => api.get('/blogs');
export const getBlogById = (id: number) => api.get(`/blog/${id}`);

// Documentos
export const getAllDocuments = () => api.get('/documentos');
export const getDocumentById = (id: number) => api.get(`/documento/${id}`);

// Notificaciones
export const getAllNotifications = () => api.get('/notificaciones');
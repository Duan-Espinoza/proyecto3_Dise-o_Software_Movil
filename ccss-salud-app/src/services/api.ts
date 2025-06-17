import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // Cambiar a la URL base de la API
  timeout: 10000, // Tiempo de espera para las solicitudes
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener datos de la API
export const fetchData = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Función para enviar datos a la API
export const postData = async (endpoint: string, data: any) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Otras funciones para manejar solicitudes a la API pueden ser añadidas aquí

export default api;
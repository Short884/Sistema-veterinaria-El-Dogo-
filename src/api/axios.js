import axios from "axios";

// URL base del backend real (veterinaria-backend, NestJS).
// Por defecto NestJS corre en el puerto 3000 (ver PORT en el .env del backend).
export const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: `${API_BASE_URL}/`,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor: adjunta el token JWT guardado a cada petición saliente
api.interceptors.request.use(
    (configuracion) => {
        const tokenGuardado = localStorage.getItem('tokenAcceso');
        if(tokenGuardado) {
            configuracion.headers.Authorization = `Bearer ${tokenGuardado}`;
        }
        return configuracion;
    },
    (error) => Promise.reject(error)
);

export default api;

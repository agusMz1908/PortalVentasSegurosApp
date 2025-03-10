import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Interceptor para agregar la API KEY a todas las solicitudes
apiClient.interceptors.request.use((config) => {
    const apiKeyParam = `api_key=${API_KEY}`;

    // Verifica si la URL ya tiene parámetros
    if (config.url.includes("?")) {
        config.url += `&${apiKeyParam}`;
    } else {
        config.url += `?${apiKeyParam}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;






import axios from 'axios';
import { Mesa, Pedido, EstadoPedido, Plato } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
console.log(BASE_URL);

// 1. Creamos la instancia (nuestra "aduana" privada)
const api = axios.create({ baseURL: BASE_URL });

// 2. Interceptor de REQUEST (antes de que la petición salga)
api.interceptors.request.use(config => {
    // Buscamos el token en la memoria del navegador
    const token = localStorage.getItem('token');

    // Si existe el token, se lo pegamos a las cabeceras
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 3. Interceptor de RESPONSE (cuando llega la respuesta del backend)
api.interceptors.response.use(
    response => response, // Si todo sale bien, devuelve la info normal
    error => {
        // Si el backend dice "401 No Autorizado" (token inválido/expirado)
        if (error.response?.status === 401) {
            localStorage.removeItem('token'); // Borramos el token malo
            window.location.href = 'login'; // Pateamos al usuario al login
        }
        return Promise.reject(error);
    }
);

// 4. Funciones

// getPlatos AHORA USA `api` -> El interceptor le pondrá el token automáticamente
export async function getPlatos() {
    // Como la instancia ya tiene baseURL, solo ponemos la ruta relativa ('/menu')
    const response = await api.get<Plato[]>('/menu', {
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    });
    return response.data;
}


//BLOQUE A
// ── Mesas ────────────────────────────────────────SIN EXISTIR
export async function getMesas(): Promise<Mesa[]> {
    const response = await api.get('/mesas');
    return response.data;
}

export async function getMesasDisponibles(): Promise<Mesa[]> {
    const response = await api.get('/mesas?estado=disponible');
    return response.data;
}

// ── Pedidos ─────────────────────────────────────── SIN EXISTIR
export async function getPedido(id: string): Promise<Pedido> {
    const response = await api.get(`/pedidos/${id}`);
    return response.data;
}

export async function crearPedido(pedidoData: any): Promise<Pedido> {
    try {
        // Intento real al backend   // pedidoData: { mesaId, tipo, items[] }
        const response = await api.post<Pedido>('/pedidos', pedidoData);
        return response.data;  // pedido creado con _id y estado: pendiente
    } catch (error) {

        // --- BACKEND SIMULADO ---
        // Si el backend real falla (ej. no está encendido), simulamos la respuesta
        console.warn("Backend no detectado. Usando respuesta simulada.");

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    _id: "65f8a" + Math.random().toString(16).slice(2, 9), // ID falso tipo MongoDB
                    mesaId: pedidoData.mesaId,
                    tipo: pedidoData.tipo,
                    items: pedidoData.items,
                    estado: 'pendiente',
                    total: pedidoData.items.reduce((acc: number, i: any) => acc + (i.precioUnitario * i.cantidad), 0),
                    createdAt: new Date().toISOString()
                });
            }, 1500); // Simulamos latencia de red
        });
    }
}


export async function cambiarEstadoPedido(id: string, estado: EstadoPedido): Promise<Pedido> {
    // estado: 'en_preparacion' | 'lista' | 'entregada' | 'cancelada'
    const response = await api.patch(`/pedidos/${id}/estado`, { estado });
    return response.data;
}



// login SIGUE USANDO `axios` directo -> No necesita token para mandar correo/password
export async function login(email: string, password: string) {
    // Aquí sí ponemos la URL completa porque no usamos la instancia
    const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password
    });
    return response.data;
}

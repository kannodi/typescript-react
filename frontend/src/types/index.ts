// Archivo central de tipos del restaurante-frontend
// Todos los tipos se exportan desde aquí — no declarar en otros archivos
// src/types/index.ts

// 1. Estados (Union Types)
export type EstadoMesa = 'disponible' | 'ocupada' | 'reservada' | 'fuera_servicio';
export type TipoPedido = 'mesa' | 'para_llevar';
export type EstadoPedido = 'pendiente' | 'en_preparacion' | 'lista' | 'entregada' | 'cancelada';

// 2. Interfaces Base (Modelos de Base de Datos)
export interface Mesa {
    id: string;
    numero: number;
    estado: EstadoMesa;
    capacidad?: number;
    pedidoActivoId?: string | null;
}

export interface Plato {
    _id: string;
    nombre: string;
    precio: number;
    stock: number;
    categoria: string;
}
//para platocard (el contador)
export interface PlatoCardProps {
    plato: Plato;
}
// 3. Interfaces del Pedido
export interface PedidoItem {
    platoId: string;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
}

export interface Pedido {
    _id: string;
    mesaId: string | null;
    tipo: TipoPedido;
    estado: EstadoPedido;
    items: PedidoItem[];
    total: number;
    createdAt: string;
}

import React, { createContext, useContext, useState } from 'react';
import { Plato, TipoPedido, PedidoItem } from '../types';

// Define el estado completo del pedido
export interface PedidoState {
    mesaId: string | null;
    tipo: TipoPedido;
    estado: string; // Lo dejamos así por ahora para no romper tu lógica
    items: PedidoItem[];
    total: number;
}
// 3. Tipamos estrictamente cada función
export interface PedidoContextType {
    pedido: PedidoState;
    agregarPlato: (plato: Plato) => void;
    restarPlato: (platoId: string) => void;
    cambiarTipo: (tipo: TipoPedido) => void;
    asignarMesa: (mesaId: string) => void;
    quitarPlatoPorIndice: (index: number) => void;
    asignarParaLlevar: () => void;
    limpiarPedido: () => void;
    setPedido: React.Dispatch<React.SetStateAction<PedidoState>>;
}
const PedidoContext = createContext<PedidoContextType | undefined>(undefined);
const estadoInicial: PedidoState = {
    mesaId: null,
    tipo: 'mesa',
    estado: 'pendiente',
    items: [],
    total: 0,
};
export function PedidoProvider({ children }: { children: React.ReactNode }) {
    const [pedido, setPedido] = useState<PedidoState>(estadoInicial);
    // Recalcular total cada vez que cambian los items
    const calcularTotal = (items: PedidoItem[]) =>
        items.reduce((acc: number, item) => acc + item.precioUnitario * item.cantidad, 0);
    // Agregar plato — si ya existe, incrementa cantidad
    const agregarPlato = (plato: Plato): void => {
        setPedido(prev => {
            const existe = prev.items.find(i => i.platoId === plato._id);
            const nuevosItems = existe
                ? prev.items.map(i =>
                    i.platoId === plato._id
                        ? { ...i, cantidad: i.cantidad + 1 }
                        : i
                )
                : [...prev.items, {
                    platoId: plato._id,
                    nombre: plato.nombre,
                    cantidad: 1,
                    precioUnitario: plato.precio,
                }];
            return { ...prev, items: nuevosItems, total: calcularTotal(nuevosItems) };
        });
    };

    // Restar un plato — decrementa o elimina si cantidad llega a 0
    const restarPlato = (platoId: string): void => {
        setPedido(prev => {
            const nuevosItems = prev.items
                .map(i => i.platoId === platoId ? { ...i, cantidad: i.cantidad - 1 } : i)
                .filter(i => i.cantidad > 0);
            return { ...prev, items: nuevosItems, total: calcularTotal(nuevosItems) };
        });
    };

    const quitarPlatoPorIndice = (index: number): void => {
        const nuevosItems = pedido.items.filter((_, indexActual) => indexActual !== index);
        const nuevoTotal = calcularTotal(nuevosItems);

        setPedido({
            ...pedido,
            items: nuevosItems,
            total: nuevoTotal
        });
    };
    // Limpiar pedido — después de enviarlo o cancelarlo
    const limpiarPedido = (): void => setPedido(estadoInicial);

    // Cambiar tipo: 'mesa' | 'para_llevar'
    const cambiarTipo = (tipo: TipoPedido): void => {
        setPedido(prev => ({
            ...prev,
            tipo,
            mesaId: tipo === 'para_llevar' ? null : prev.mesaId,
        }));
    };

    // Asignar mesa al pedido
    const asignarMesa = (mesaId: string): void => {
        setPedido(prev => ({ ...prev, mesaId, tipo: 'mesa' }));
        console.log(mesaId);
    };

    const asignarParaLlevar = (): void => {
        setPedido(prev => ({ ...prev, mesaId: null, tipo: 'para_llevar' }));
    };

    return (
        <PedidoContext.Provider value={{
            pedido,
            agregarPlato,
            setPedido,
            restarPlato,
            cambiarTipo,
            asignarMesa,
            quitarPlatoPorIndice,
            asignarParaLlevar,
            limpiarPedido
        }}>
            {children}
        </PedidoContext.Provider>
    );
}

export function usePedido(): PedidoContextType {
    const context = useContext(PedidoContext);
    if (!context) throw new Error('usePedido debe usarse dentro de PedidoProvider');
    return context;
}

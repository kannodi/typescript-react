import React, { createContext, useContext, useState } from 'react';
export interface PedidoItem {
    platoId: string;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
}
// Define el estado completo del pedido
export interface PedidoState {
    mesaId: string | null;
    tipo: 'mesa' | 'para_llevar';
    estado: string;
    items: PedidoItem[];
    total: number;
}
interface PedidoContextType {
    pedido: PedidoState;
    agregarPlato: (plato: any) => void;
    restarPlato: (platoId: string) => void;
    cambiarTipo: (tipo: 'mesa' | 'para_llevar') => void;
    asignarMesa: (mesaId: string) => void;
    quitarPlatoPorIndice: (index: number) => void;
    asignarParaLlevar: () => void;
    limpiarPedido: () => void;
    setPedido: React.Dispatch<React.SetStateAction<PedidoState>>;
}
//--------------------------
const PedidoContext = createContext<PedidoContextType | undefined>(undefined);
const estadoInicial: PedidoState = {
    mesaId: null,                  // null = pedido para llevar
    tipo: 'mesa',                  // 'mesa' | 'para_llevar'
    estado: 'pendiente',           // estado actual del pedido
    items: [],                     // [{ _id, nombre, cantidad, precioUnitario }]
    total: 0,                      // calculado automáticamente
};
export function PedidoProvider({ children }: { children: React.ReactNode }) {
    const [pedido, setPedido] = useState<PedidoState>(estadoInicial);
    // Recalcular total cada vez que cambian los items
    const calcularTotal = (items: PedidoItem[]) =>
        items.reduce((acc: number, item) => acc + item.precioUnitario * item.cantidad, 0);
    // Agregar plato — si ya existe, incrementa cantidad
    const agregarPlato = (plato: any) => {
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
    const restarPlato = (platoId: string) => {
        setPedido(prev => {
            const nuevosItems = prev.items
                .map(i => i.platoId === platoId ? { ...i, cantidad: i.cantidad - 1 } : i)
                .filter(i => i.cantidad > 0);
            return { ...prev, items: nuevosItems, total: calcularTotal(nuevosItems) };
        });
    };

    const quitarPlatoPorIndice = (index: number) => {
        const nuevosItems = pedido.items.filter((_, indexActual) => indexActual !== index);
        const nuevoTotal = calcularTotal(nuevosItems);

        setPedido({
            ...pedido,
            items: nuevosItems,
            total: nuevoTotal
        });
    };
    // Limpiar pedido — después de enviarlo o cancelarlo
    const limpiarPedido = () => setPedido(estadoInicial);

    // Cambiar tipo: 'mesa' | 'para_llevar'
    const cambiarTipo = (tipo: 'mesa' | 'para_llevar') => {
        setPedido(prev => ({
            ...prev,
            tipo,
            mesaId: tipo === 'para_llevar' ? null : prev.mesaId,
        }));
    };

    // Asignar mesa al pedido
    const asignarMesa = (mesaId: string) => {
        setPedido(prev => ({ ...prev, mesaId, tipo: 'mesa' }));
        console.log(mesaId);
    };

    const asignarParaLlevar = () => {
        setPedido(prev => ({ ...prev, mesaId: null, tipo: 'para_llevar' }));
    };

    return (
        <PedidoContext.Provider value={{ pedido, agregarPlato, setPedido, restarPlato, cambiarTipo, asignarMesa, quitarPlatoPorIndice, asignarParaLlevar, limpiarPedido }}>
            {children}
        </PedidoContext.Provider>
    );
}

export function usePedido() {
    const context = useContext(PedidoContext);
    if (!context) throw new Error('usePedido debe usarse dentro de PedidoProvider');
    return context;
}

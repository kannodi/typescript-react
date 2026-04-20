import { createContext, useContext, useState } from 'react';
const PedidoContext = createContext(null);
const estadoInicial = {
    mesaId: null,                  // null = pedido para llevar
    tipo: 'mesa',                  // 'mesa' | 'para_llevar'
    estado: 'pendiente',           // estado actual del pedido
    items: [],                     // [{ _id, nombre, cantidad, precioUnitario }]
    total: 0,                      // calculado automáticamente
};
export function PedidoProvider({ children }) {
    const [pedido, setPedido] = useState(estadoInicial);
    // Recalcular total cada vez que cambian los items
    const calcularTotal = (items) =>
        items.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0);
    // Agregar plato — si ya existe, incrementa cantidad
    const agregarPlato = (plato) => {
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
    const restarPlato = (platoId) => {
        setPedido(prev => {
            const nuevosItems = prev.items
                .map(i => i.platoId === platoId ? { ...i, cantidad: i.cantidad - 1 } : i)
                .filter(i => i.cantidad > 0);
            return { ...prev, items: nuevosItems, total: calcularTotal(nuevosItems) };
        });
    };

    const quitarPlatoPorIndice = (index) => {
        const nuevosItems = pedido.items.filter((item, indexActual) => indexActual !== index);
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
    const cambiarTipo = (tipo) => {
        setPedido(prev => ({
            ...prev,
            tipo,
            mesaId: tipo === 'para_llevar' ? null : prev.mesaId,
        }));
    };

    // Asignar mesa al pedido
    const asignarMesa = (mesaId) => {
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

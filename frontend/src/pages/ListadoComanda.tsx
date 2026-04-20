import { useState, useEffect } from 'react';
import { getPlatos, crearPedido, cambiarEstadoPedido } from '../services/api';
import { usePedido } from '../context/PedidoContext';//importar context pedido
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ListadoComanda() {
    // 1. TODOS los hooks (useState, usePedido) JUNTOS AL PRINCIPIO
    const navigate = useNavigate();
    const { agregarPlato, restarPlato, quitarPlatoPorIndice, limpiarPedido, pedido } = usePedido();
    const [platos, setPlatos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [pedidoCreado, setPedidoCreado] = useState(null);

    useEffect(() => {
        async function cargarDatos() {
            try {
                setLoading(true);
                const data = await getPlatos();
                if (!Array.isArray(data)) {
                    throw new Error("La respuesta de la API no es válida (verifica VITE_API_URL)");
                }
                setPlatos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        cargarDatos();
    }, []);

    if (loading) return <p className='text-blue-500 animate-pulse m-4'>Cargando la comanda...</p>;
    if (error) return <p className='bg-red-100 text-red-500 m-4'>Error: {error}</p>;

    //SIMULACION DE PEDIDO ENVIADO

    const handleEnviarComanda = async () => {
        if (pedido.items.length === 0) return;
        setEnviando(true);
        setError(null);
        try {
            const nuevoPedido = await crearPedido({
                mesaId: pedido.mesaId,
                tipo: pedido.tipo,
                items: pedido.items,
            });
            setPedidoCreado(nuevoPedido);
            limpiarPedido();  // limpiar el Context después del éxito
        } catch (err) {
            setError('No se pudo crear el pedido. Intenta de nuevo.');
        } finally {
            setEnviando(false);
        }
    };
    // Si el pedido ya fue creado — mostrar confirmación
    if (pedidoCreado) {
        return (
            <div className='m-10 p-10 text-center border-2 border-green-500 rounded-2xl bg-green-50 shadow-lg w-96 ml-auto mr-auto'>
                <div className='text-6xl mb-4'>✅</div>
                <h2 className='text-3xl font-bold text-green-700 font-serif italic'>¡Comanda enviada con éxito!</h2>
                <p className='text-gray-600 mt-4 text-xl'>
                    Orden ID: <span className='font-mono font-bold text-black'>{pedidoCreado._id.slice(-6).toUpperCase()}</span>
                </p>
                <div className='my-4 border-y border-green-200 py-2'>
                    <p className='text-gray-500'> {pedidoCreado.mesaId ? `Mesa: ${pedidoCreado.mesaId}` : 'Para llevar 🛍️'}</p>
                    <p className='text-gray-500 font-bold'>Total: S/ {pedidoCreado.total.toFixed(2)}</p>
                </div>

                <Link to='/mesas' className='mt-4 bg-green-600 text-white px-8 py-2 rounded-full font-bold hover:bg-green-700 transition-all'>
                    Volver a mesas
                </Link>
            </div>
        );
    }


    return (
        <div className='m-10 flex flex-col gap-2 justify-start'>
            <Link to='/mesas' className='text-blue-500 hover:underline'>
                ← Volver a mesas
            </Link>
            <h2 className='bg-blue-400 text-white text-2xl font-bold p-2 rounded-xl mb-2'> 🧾NUEVA COMANDA</h2>


            <div className='p-6'>
                <h1 className='text-2xl font-bold mb-4'>Comanda activa</h1>
                <p className='text-gray-500 mb-2'>
                    Tipo: {pedido.tipo} · Estado: {pedido.estado}
                </p>
                {pedido.items.length === 0 ? (
                    <p className='text-gray-400'>No hay items en la comanda</p>
                ) : (
                    <ul>
                        {pedido.items.map((item, i) => (
                            <li key={i} className='flex justify-between py-2 border-b'>
                                <span>{item.nombre} x{item.cantidad}</span>
                                <span>S/ {(item.precioUnitario * item.cantidad).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                )}
                <p className='font-bold text-right mt-4'>Total: S/ {pedido.total.toFixed(2)}</p>
            </div>

            <div className='grid grid-cols-2 gap-6'>
                {/* Columna izquierda — platos */}
                <div className='flex flex-col gap-3'>
                    {platos.map(plato => (
                        <div className='flex justify-between items-center bg-gray-200 rounded-xl p-2' key={plato._id}>
                            <strong className='px-2 py-1'>{plato.nombre} — S/ {plato.precio}</strong>
                            <button className='bg-gray-200 rounded-xl px-2 py-1' onClick={() => agregarPlato(plato)}>Agregar</button>
                        </div>
                    ))}
                </div>
                {/* Columna derecha — comanda */}
                <div className='flex flex-col gap-3 border border-gray-400 rounded-xl p-2'>
                    <h2 className='bg-yellow-500 text-white text-md font-bold p-3 gap-5 rounded-xl flex justify-between items-center'>
                        <span>🛒 LISTADO DE COMANDA</span>
                    </h2>
                    <span className='flex justify-between items-center'><h3>Total de pedidos: ({pedido.items.length})</h3>
                        <button className='border border-red-400 rounded-xl hover:bg-red-400 hover:text-white px-2 py-1'
                            onClick={limpiarPedido}>Limpiar Comanda</button>
                    </span>
                    {pedido.items.map((item, index) => (
                        <div className='grid grid-cols-4 justify-between items-center m-2' key={index}>
                            <strong>{item.nombre}</strong>
                            <div className='flex justify-between items-center'>
                                <button className='font-bold bg-gray-200 border border-gray-400 rounded-full px-3 py-1' onClick={() => restarPlato(item.platoId)}> - </button>
                                <span>{item.cantidad}</span>
                                <button className='font-bold bg-gray-200 border border-gray-400 rounded-full px-3 py-1' onClick={() => agregarPlato({ _id: item.platoId, nombre: item.nombre, precio: item.precioUnitario })}> + </button>
                            </div>
                            <strong className='text-center'> S/ {item.precioUnitario * item.cantidad}</strong>
                            <button onClick={() => quitarPlatoPorIndice(index)}>🗑️</button>
                        </div>
                    ))}
                    <div className='flex justify-between items-center bg-gray-200 border border-gray-400 rounded-xl p-2'>
                        <strong>Total: S/ {pedido.total}</strong>
                        <button
                            onClick={handleEnviarComanda}
                            disabled={enviando || pedido.items.length === 0}
                            className='bg-black text-white rounded-xl hover:bg-gray-800 px-4 py-2 active:scale-95 disabled:opacity-50 transition-all font-bold'
                        >
                            {enviando ? 'Enviando a cocina...' : 'Enviar Comanda'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

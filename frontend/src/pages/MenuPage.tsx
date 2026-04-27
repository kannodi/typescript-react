import { useState, useEffect } from 'react';
import { getPlatos } from '../services/api';
import { Plato } from '../types';

export default function MenuPage() {
    const [platos, setPlatos] = useState<Plato[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const cargarMenu = async (): Promise<void> => {
            try {
                setLoading(true);
                const data: Plato[] = await getPlatos();
                setPlatos(data);
            } catch (err: unknown) {
                const mensaje = err instanceof Error ? err.message : "Error desconocido";
                setError(mensaje);
            } finally {
                setLoading(false);
            }
        };
        cargarMenu();
    }, []);

    if (loading) return <p className='text-blue-500 animate-pulse m-4'>Cargando el menú del restaurante...</p>;
    if (error) return <p className='bg-red-100 text-red-500 m-4'>Error: {error} — verifica que el backend está corriendo.</p>;

    return (
        <div className="m-10 flex flex-col gap-2 justify-start ">

            <h2 className="bg-blue-400 text-white text-2xl font-bold p-2 rounded-xl mb-2">Menú del Restaurante</h2>

            {platos.map((plato: Plato) => (
                <div className='grid grid-cols-4 p-2 bg-gray-100 rounded-xl' key={plato._id}>
                    <strong className='px-2 py-1'>{plato.nombre}</strong>
                    <span className='bg-blue-100 rounded-full px-3 p-1 text-blue-500 w-fit'>{plato.categoria}</span>
                    <span className='text-green-600 font-semibold text-lg'>S/ {plato.precio}</span>
                    <span className={`text-xs font-medium rounded-full w-fit px-3 p-1 ${plato.stock > 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-500'
                        }`}>
                        {plato.stock > 0 ? '✅ Disponible' : '❌ Agotado'}
                    </span>
                </div>
            ))}
        </div>
    );
}

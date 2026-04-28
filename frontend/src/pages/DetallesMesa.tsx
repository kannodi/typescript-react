import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mesasMock } from '../data/mesas.mock';
import { getMesas } from '../services/api';
import { Mesa } from '../types';

export default function DetallesMesa() {
    // 1. useParams tipado. El genérico es <{ id: string }> porque tu ruta usa 'id'
    // IMPORTANTE: Aunque pongamos string, TS sabe que puede ser undefined
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // 2. Estados tipados
    const [mesa, setMesa] = useState<Mesa | null>(null);
    const [cargando, setCargando] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);

    // 3. Efecto para buscar la mesa
    useEffect(() => {
        // GUARD OBLIGATORIO: Type Narrowing. 
        if (!id) {
            navigate('/mesas');
            return;
        }

        // ¡A partir de aquí, TypeScript sabe con certeza que 'id' es un string!

        const cargarDetalle = async (): Promise<void> => {
            setCargando(true);
            try {
                // Buscamos todas las mesas en la API
                const todas: Mesa[] = await getMesas();
                const encontrada = todas.find(m => m._id === id) ?? null;
                setMesa(encontrada);
            } catch (err: unknown) {
                console.warn("Falló getMesas, buscando en el mock");
                // Si falla la red, buscamos en el mock local
                const encontradaMock = mesasMock.find(m => String(m._id) === id) as unknown as Mesa ?? null;
                setMesa(encontradaMock);
            } finally {
                setCargando(false);
            }
        };

        cargarDetalle();
    }, [id, navigate]); // Dependencias del useEffect

    if (cargando) return <p className='p-6'>Cargando...</p>;
    // if (error) return <p className='p-6 text-red-500'>Error: {error}</p>;

    // Si terminó de cargar y no hay mesa, mostramos el error
    if (!mesa) {
        return (
            <div className='p-6 border-2 border-gray-200 rounded-xl m-20'>
                <p className='text-red-500 text-5xl font-bold mt-4 text-center'>Mesa no encontrada</p>
                <button onClick={() => navigate('/mesas')} className='block mx-auto m-10 bg-blue-500 text-white px-4 py-2 rounded-xl'>
                    Volver a mesas
                </button>
            </div>
        );
    }

    return (
        <div className='w-[300px] p-6 border-2 border-gray-200 rounded-xl m-8 '>
            <Link to='/mesas' className='text-blue-500 hover:underline'>
                ← Volver a mesas
            </Link>
            <h1 className='text-3xl font-bold mt-4'>Mesa {mesa.numero}</h1>
            <p className='text-gray-600 text-1xl font-mono mt-1'> Detalle de la mesa</p>
            {/* Como cambiamos a la interface oficial, usamos _id en lugar de id */}
            <p className='text-1xl font-mono mt-4'>ID Interno: {mesa._id}</p>
            <p className='text-1xl font-mono mt-4'>Estado:
                <span className={
                    mesa.estado === 'disponible' ? 'text-green-500' :
                        mesa.estado === 'ocupada' ? 'text-red-500' :
                            'text-gray-500'
                }>
                    {mesa.estado === 'disponible' ? ' Libre' :
                        mesa.estado === 'ocupada' ? ' Ocupada' :
                            ' Fuera de servicio'}
                </span>
            </p>
        </div>
    );
}

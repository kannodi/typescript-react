import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Quitamos los .js y .jsx de las importaciones, TypeScript no los necesita
import { mesasMock } from '../data/mesas.mock';
import { getMesas } from '../services/api';
import MesaCard from '../components/MesaCard';
import { usePedido } from '../context/PedidoContext';
// IMPORTAMOS LA INTERFAZ CENTRALIZADA
import { Mesa } from '../types';

const MesasPage = () => {
    // 1. Tipamos los estados (Array de Mesas, booleanos y string)
    const [mesas, setMesas] = useState<Mesa[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const { asignarMesa, asignarParaLlevar } = usePedido();
    const navigate = useNavigate();

    // 2. Tipamos este objeto mágico usando Record para que sepa que acepta los estados de Mesa
    const ESTADO_CLASES: Record<Mesa['estado'], string> = {
        disponible: 'bg-green-100 border-green-400 text-green-800',
        ocupada: 'bg-red-100 border-red-400 text-red-800',
        reservada: 'bg-yellow-100 border-yellow-400 text-yellow-800',
        fuera_servicio: 'bg-gray-100 border-gray-400 text-gray-600',
    };

    // 3. El famoso useEffect tipado
    useEffect(() => {
        const cargarMesas = async (): Promise<void> => {
            setLoading(true);
            try {
                const data: Mesa[] = await getMesas();
                setMesas(data);
            } catch (err: unknown) {
                // Si la red falla (como no hay backend de mesas aún), usamos tus mocks
                console.warn("Falló getMesas, usando mock de respaldo");
                setMesas(mesasMock as unknown as Mesa[]);
            } finally {
                setLoading(false);
            }
        };
        cargarMesas();
    }, []);

    // 4. Tipamos las funciones (handlers)
    const handleSeleccionarMesa = (mesaid: string): void => {
        asignarMesa(mesaid);
        navigate(`/mesas/ListadoComanda`);
    };

    const handleParaLlevar = (): void => {
        asignarParaLlevar();
        navigate(`/mesas/ListadoComanda`);
    };

    if (loading) return <p className='p-6 text-gray-500'>Cargando mesas...</p>;
    if (error) return <p className='p-6 text-red-500'>{error}</p>;

    return (
        <>
            <div className='p-6'>
                <div className='flex items-center'>
                    <h1 className='text-2xl font-bold mb-6 ml-10 mr-10 mt-5'>Mesas del restaurante</h1>
                    <button onClick={handleParaLlevar}
                        className='ml-10 bg-blue-500 text-white font-bold text-xl rounded-xl px-10 py-1 active:scale-90 '>
                        Para llevar
                    </button>
                </div>
                <div className='grid grid-cols-5 gap-5 ml-10 mr-10 mt-10 '>
                    {/* 5. AHORA mapeamos la variable del estado `mesas`, ya no el mock directo */}
                    {mesas.map((mesa: Mesa) => (
                        <div key={mesa._id} className={`flex flex-col items-center border-2 rounded-xl p-4 ${ESTADO_CLASES[mesa.estado]}`} >
                            <MesaCard _id={mesa._id} numero={mesa.numero} estado={mesa.estado} />
                            {mesa.estado === 'disponible' && (
                                <button onClick={() => handleSeleccionarMesa(mesa._id)}
                                    className={`${mesa.estado === 'disponible' ? 'bg-green-500 hover:bg-green-700' :
                                        mesa.estado === 'ocupada' ? 'bg-red-500 hover:bg-red-700' : mesa.estado === 'reservada' ? 'bg-yellow-500 hover:bg-yellow-700' :
                                            'bg-gray-500 hover:bg-gray-700'} text-white text-2xl font-bold rounded-xl px-6 py-2`}>
                                    Tomar Comanda
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div >
        </>
    );
};

export default MesasPage;
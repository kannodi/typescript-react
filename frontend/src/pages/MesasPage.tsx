import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mesasMock } from '../data/mesas.mock.js';
import { getMesas } from '../services/api.js';//FALTA BACKEND
import MesaCard from '../components/MesaCard.jsx';
import { usePedido } from '../context/PedidoContext.jsx';
const MesasPage = () => {
    const [mesas, setMesas] = useState([mesasMock]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { asignarMesa, asignarParaLlevar } = usePedido();
    const navigate = useNavigate();

    const ESTADO_CLASES = {
        disponible: 'bg-green-100 border-green-400 text-green-800',
        ocupada: 'bg-red-100 border-red-400 text-red-800',
        reservada: 'bg-yellow-100 border-yellow-400 text-yellow-800',
        fuera_servicio: 'bg-gray-100 border-gray-400 text-gray-600',
    };
    /* HACE FALTA EL BACKEND
    useEffect(() => {
        getMesas()
            .then(data => setMesas(data))
            .catch(err => setError('No se pudieron cargar las mesas'))
            .finally(() => setLoading(false));
    }, []);*/

    const handleSeleccionarMesa = (mesaid) => {
        asignarMesa(mesaid);
        navigate(`/mesas/ListadoComanda`);
    };

    const handleParaLlevar = () => {
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
                    <button onClick={() => handleParaLlevar()}
                        className='ml-10 bg-blue-500 text-white font-bold text-xl rounded-xl px-10 py-1 active:scale-90 '>
                        Para llevar
                    </button>
                </div>
                <div className='grid grid-cols-5 gap-5 ml-10 mr-10 mt-10 '>
                    {mesasMock.map(mesa => (
                        <div key={mesa.id} className={`flex flex-col items-center border-2 rounded-xl p-4 ${ESTADO_CLASES[mesa.estado]}`} >
                            <MesaCard id={mesa.id} numero={mesa.numero} capacidad={mesa.capacidad} estado={mesa.estado} comensales={mesa.comensales} />
                            {mesa.estado === 'disponible' && (
                                <button onClick={() => handleSeleccionarMesa(mesa.id)}
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
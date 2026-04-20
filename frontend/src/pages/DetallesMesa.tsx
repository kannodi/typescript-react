import { useParams, Link, useNavigate } from 'react-router-dom';
import { mesasMock } from '../data/mesas.mock';

export default function DetalleMesa() {
    const { id } = useParams();
    const navigate = useNavigate();
    const mesa = mesasMock.find(m => String(m.id) === id);

    if (!mesa) {
        return (
            <div className='p-6 border-2 border-gray-200 rounded-xl m-20'>
                <p className='text-red-500 text-5xl font-bold mt-4 text-center'>Mesa {id} no encontrada</p>
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
            <p className='text-1xl font-mono mt-4'>Capacidad: {mesa.capacidad} personas</p>
            <p className='text-1xl font-mono mt-4'>Comensales: {mesa.comensales}</p>
            <p className='text-1xl font-mono mt-4'>Estado:
                <span className={
                    mesa.estado === 'libre' ? 'text-green-500' :
                        mesa.estado === 'ocupada' ? 'text-red-500' :
                            'text-gray-500'
                }>
                    {mesa.estado === 'libre' ? ' Libre' :
                        mesa.estado === 'ocupada' ? ' Ocupada' :
                            ' Fuera de servicio'}
                </span>
            </p>
        </div>
    );
}

import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col items-center justify-center h-screen gap-4'>
            <h1 className='text-6xl font-bold text-gray-300'>404</h1>
            <p className='text-gray-500'>Esta página no existe en el restaurante</p>
            <button
                onClick={() => navigate('/')}
                className='bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600'>
                Ir a la carta
            </button>
        </div>
    );
}


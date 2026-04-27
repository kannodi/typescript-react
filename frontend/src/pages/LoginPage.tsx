import { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await login(email, password);
            localStorage.setItem('token', data.token);
            console.log('Login exitoso — token guardado');
            navigate('/menu');
        } catch (err) {
            setError(err.response?.data?.message || 'Credenciales incorrectas');
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-300 to-yellow-300 flex items-center justify-center'>
            <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm'>
                <div className='text-center mb-6'>
                    <h1 className='text-2xl font-bold text-gray-800'>🍽️ Sr. Raul</h1>
                    <p className='text-gray-400 text-sm mt-1'>Sistema de comandas</p>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div>
                        <label className='text-sm font-medium text-gray-600'>Email</label>
                        <input type='email' value={email} onChange={e => setEmail(e.target.value)}
                            placeholder='mesero@restaurante.com'
                            className='w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ' />
                    </div>
                    <div>
                        <label className='text-sm font-medium text-gray-600'>Contraseña</label>
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)}
                            placeholder='••••••••'
                            className='w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    </div>
                    <button type='submit'
                        disabled={loading}
                        className='w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-2 active:scale-90 active:bg-blue-800' >
                        {loading ? 'Ingresando...' : 'Ingresar al sistema'}
                    </button>
                    {error && <p className='text-red-500 mt-3 text-center'>{error}</p>}
                </form>
            </div>
        </div>
    );
}


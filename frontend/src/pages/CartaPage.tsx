import { useState, useEffect } from 'react';
import PlatoCard from '../components/PlatoCard';
import { getPlatos } from '../services/api';

function CartaPage() {
  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarPlatos() {
      try {
        setLoading(true);
        const data = await getPlatos();
        setPlatos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    cargarPlatos();
  }, []);

  if (loading) return <p className='text-blue-500 animate-pulse m-4'>Cargando la carta...</p>;
  if (error) return <p className='bg-red-100 text-red-500 m-4'>Error: {error}</p>;

  return (
    <div className='m-10'>
      <h1 className="bg-blue-400 text-white text-2xl font-bold p-2 rounded-xl mb-2 ">Carta del Restaurante</h1>
      <div className=' flex-col grid grid-cols-3 gap-1'>
        {platos.map(plato => (
          <PlatoCard
            key={plato._id}
            plato={plato}
          />
        ))}
      </div>
    </div>
  )
}

export default CartaPage
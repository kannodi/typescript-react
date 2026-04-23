import { usePedido, PedidoItem } from '../context/PedidoContext';
import { PlatoCardProps } from '../types';



function PlatoCard({ plato }: PlatoCardProps) {

  const { agregarPlato, restarPlato, pedido } = usePedido();

  // 1. Buscamos en el carrito (pedido.items) si existe algún item con el mismo ID que este plato
  const itemEnCarrito = pedido.items.find((item: PedidoItem) => item.platoId === plato._id);
  // 2. Si lo encuentra, tomamos su cantidad. Si no existe en el carrito, la cantidad es 0
  const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;

  return (
    <div className='bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 border border-gray-150 m-4'>
      <div className='flex justify-between items-start'>
        {/* 3. Mostramos la cantidad en un círculo si la cantidad en el carrito es mayor a 0 */}
        <h3 className='font-bold text-gray-800 text-lg flex items-center'>
          {plato.nombre}
          {cantidadActual > 0 && (
            <span className="ml-2 inline-flex items-center justify-center bg-blue-500 text-white rounded-full w-10 h-7 text-lg">
              X {cantidadActual}
            </span>
          )}
        </h3>
        <span className='text-green-600 font-semibold text-lg'>S/ {plato.precio}</span>
      </div>
      <div>
        <span className={`text-xs font-medium px-2 py-1 rounded-lg ${plato.stock > 0
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-500'
          }`}>
          {plato.stock > 0 ? '✅ Disponible' : '❌ Agotado'}
        </span>
        <span className='ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg w-fit'>
          {plato.categoria}
        </span>

      </div>
      <div className='flex justify-between items-center mt-1'>
        <span className='text-gray-400 text-sm'>Stock: {plato.stock}</span>

      </div>
      <div className='flex justify-between items-center mt-1'>
        <button onClick={() => agregarPlato(plato)}
          className='justify-end mt-2  bg-yellow-500 text-white font-bold py-1 rounded hover:bg-yellow-600 p-4'>
          Agregar a comanda
        </button>
        <button onClick={() => restarPlato(plato._id)}
          className='justify-end mt-2  bg-yellow-500 text-white font-bold py-1 rounded hover:bg-yellow-600 p-4'>
          Restar de la comanda
        </button>
      </div>

    </div>


  );
}


export default PlatoCard



import { Link } from 'react-router-dom'
type EstadoMesa = 'disponible' | 'ocupada' | 'reservada' | 'fueradeservicio'

interface MesaCardProps {
  id: string;
  numero: number;
  estado: EstadoMesa;
}
function MesaCard({ id, numero, estado }: MesaCardProps) {
  return (
    <div className='p-10 flex flex-col items-center' >
      <Link to={`/mesas/${id}`} className='text-black hover:underline  text-bold text-2xl'>Ver detalle </Link>
      <h2 className='text-center text-4xl m-4'>Mesa {numero}</h2>
      <p className='mt-2 text-center'>{estado === "disponible" ? "Disponible" : estado === "ocupada" ? "Ocupada" : estado === "reservada" ? "Reservada" : "Fuera de servicio"}</p>
    </div >
  )
}



export default MesaCard
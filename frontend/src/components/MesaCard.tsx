import { Link } from 'react-router-dom'
import { Mesa } from '../types'

function MesaCard({ _id, numero, estado }: Mesa) {
  return (
    <div className='p-10 flex flex-col items-center' >
      <Link to={`/mesas/${_id}`} className='text-black hover:underline  text-bold text-2xl'>Ver detalle </Link>
      <h2 className='text-center text-4xl m-4'>Mesa {numero}</h2>
      <p className='mt-2 text-center'>{estado === "disponible" ? "Disponible" : estado === "ocupada" ? "Ocupada" : estado === "reservada" ? "Reservada" : "Fuera de servicio"}</p>
    </div >
  )
}



export default MesaCard
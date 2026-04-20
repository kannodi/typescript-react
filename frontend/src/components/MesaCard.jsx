import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function MesaCard({ id, numero, capacidad, estado, comensales }) {
  return (
    <div className='p-10 flex flex-col items-center' >
      <Link to={`/mesas/${id}`} className='text-black hover:underline  text-bold text-2xl'>Ver detalle </Link>
      <h2 className='text-center text-4xl m-4'>Mesa {numero}</h2>
      <p className='mt-2 text-center'>{estado === "disponible" ? "Disponible" : estado === "ocupada" ? "Ocupada" : estado === "reservada" ? "Reservada" : "Fuera de servicio"}</p>
    </div >
  )
}

MesaCard.propTypes = {
  numero: PropTypes.number.isRequired,
  estado: PropTypes.string.isRequired,
  capacidad: PropTypes.number,
  comensales: PropTypes.number,
}

export default MesaCard
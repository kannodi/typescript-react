import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { usePedido } from '../context/PedidoContext';
interface NavBarProps {
    nombreRestaurante: string;
}
function NavBar({ nombreRestaurante = "Restaurante Raul" }: NavBarProps) {
    const { pedido } = usePedido();
    const totalItems = pedido.items.reduce((acc, i) => acc + i.cantidad, 0);
    const navigate = useNavigate();
    const [sesion, setSesion] = useState(!!localStorage.getItem('token'));
    //si hay token en el localstorage, setSesion a true
    useEffect(() => {
        const token = localStorage.getItem('token');
        setSesion(!!token);
    }, []);
    //cerrar sesion eliminando en token del localstorage
    const botonLogout = () => {
        if (confirm('¿Estas seguro de cerrar sesión?')) {
            localStorage.removeItem('token');
            setSesion(false);
            navigate('/login');
        }
    }
    const navBarClass = ({ isActive }: { isActive: boolean }) => {
        const navBar = "text-black font-bold text-xl px-1 py-1 w-fit m-2 ";

        return navBar + (isActive
            ? 'text-white border-b-2 border-white pb-1'
            : 'hover:text-gray-300 transition-colors');
    }

    return (
        <>
            <nav className="flex items-center justify-between px-7 bg-blue-400">
                <h1 className=' text-white text-4xl p-7 '> {nombreRestaurante}</h1>
                <div className=' flex gap-2'>
                    <NavLink to='/menu' className={navBarClass}>Menu</NavLink>
                    <NavLink to='/mesas' className={navBarClass}>Mesas</NavLink>
                    <NavLink to='/carta' className={navBarClass}>Carta</NavLink >
                </div >

                {/*MOSTRAR CARRITO*/}
                {totalItems > 0 && (
                    <div className='fixed bottom-4 right-4 bg-yellow-500 text-white
                        rounded-full px-4 py-2 font-bold shadow-lg'>
                        Comanda: {totalItems} items
                    </div>
                )}

                <div>
                    {sesion ? (
                        <button onClick={botonLogout} className="text-white font-bold text-xl rounded-full px-1 py-1 w-fit m-2 flex justify-end">SALIR</button>
                    ) : (
                        <button onClick={() => navigate('/login')} className="text-white font-bold text-xl rounded-full px-1 py-1 w-fit m-2 flex justify-end">ENTRAR</button>
                    )}
                </div>
            </nav >
        </>
    );
}


export default NavBar
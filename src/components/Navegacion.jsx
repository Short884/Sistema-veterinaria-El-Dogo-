import { Link, useNavigate } from "react-router-dom";
import { useAutenticacion } from "../hooks/useAutenticacion";

function Navegacion() {
    const navegar = useNavigate();
    // Usuario logueado y función de logout, provistos por AutenticacionProvider
    const { usuarioActual, cerrarSesion } = useAutenticacion();

    const manejarCierreSesion = () => {
        cerrarSesion();
        navegar('/login');
    };

    return (
        <nav>
            <Link to="/">Clientes</Link> |
            <Link to="/mascotas"> Mascotas</Link> |
            <Link to="/config"> Configuración</Link>

            <span style={{ marginLeft: '16px' }}>
                {usuarioActual?.email || 'Usuario conectado'}
                {usuarioActual?.rol ? ` (${usuarioActual.rol})` : ''}
            </span>

            <button onClick={manejarCierreSesion} style={{ marginLeft: '8px' }}>
                Salir
            </button>
        </nav>
    )
}

export default Navegacion;

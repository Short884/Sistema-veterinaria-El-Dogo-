import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Hook personalizado que expone iniciarSesion() usando el token JWT del backend
import { useAutenticacion } from "../hooks/useAutenticacion";

function Login() {
    // Ahora manejamos correo electrónico y contraseña (ya no hay clave estática)
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [password, setPassword] = useState('');

    // Estados para retroalimentación visual (cargando y errores)
    const [cargando, setCargando] = useState(false);
    const [mensajeError, setMensajeError] = useState('');

    const { iniciarSesion } = useAutenticacion();
    const navegar = useNavigate();

    const manejadorEnviar = async (e) => {
        e.preventDefault();
        setMensajeError('');
        setCargando(true);

        // Llamada asíncrona a la API a través de 'iniciarSesion'
        const resultado = await iniciarSesion(correoElectronico, password);

        setCargando(false);

        if (resultado.exito) {
            // Login exitoso: redirigimos a la pantalla protegida de clientes
            navegar('/');
        } else {
            // Error (ej. contraseña incorrecta): lo mostramos en pantalla
            setMensajeError(resultado.mensaje);
            setPassword('');
        }
    };

    return (
        <div>
            <h2>Verificación de usuario</h2>
            <p>Ingresa tu correo y clave de acceso para continuar.</p>

            {mensajeError && (
                <p style={{ color: 'red' }}>{mensajeError}</p>
            )}

            <form onSubmit={manejadorEnviar}>
                <label htmlFor="correo">Correo electrónico:
                    <input
                        id="correo"
                        type="email"
                        placeholder="admin@eldogo.com"
                        value={correoElectronico}
                        onChange={(e) => setCorreoElectronico(e.target.value)}
                        required
                    />
                </label>
                <label htmlFor="password">Contraseña:
                    <input
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button type="submit" disabled={cargando}>
                    {cargando ? 'Verificando...' : 'Ingresar'}
                </button>
            </form>
        </div>
    );
}

export default Login;

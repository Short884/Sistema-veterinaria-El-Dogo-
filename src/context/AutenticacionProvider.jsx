import { useState } from "react";
import api from "../api/axios";
import { VeterinariaContext } from "./VeterinariaContext";

export const AutenticacionProvider = ({ children }) => {
    const [ usuarioActual, setUsuarioActual ] = useState(() => {
        const tokenGuardado = localStorage.getItem('tokenAcceso');
        const usuarioGuardado = localStorage.getItem('datosUsuario');

        if( tokenGuardado && usuarioGuardado ) {
            try {
                return JSON.parse(usuarioGuardado);
            } catch (error) {
                console.error('Error al parsear los datos del usuario: ', error);
                return null;
            }
        }
        return null;
    });

    const iniciarSesion = async (correoElectronico, contrasena) => {
        try {
            const respuesta = await api.post('auth/login', {
                correoElectronico,
                contrasena
            });

            const { tokenAcceso, usuario } = respuesta.data;

            localStorage.setItem('tokenAcceso', tokenAcceso);
            localStorage.setItem('datosUsuario', JSON.stringify(usuario));

            setUsuarioActual(usuario);

            return { exito: true };
        } catch (error) {
            const mensajeError = error.response?.data?.mensaje || 'Error al iniciar la sesión';
            return { exito: false, mensaje: mensajeError };
        }
    };

    const cerrarSesion = () => {
        localStorage.removeItem('tokenAcceso');
        localStorage.removeItem('datosUsuario');

        setUsuarioActual(null);
    };

    const valoresContexto = {
        usuarioActual,
        iniciarSesion,
        cerrarSesion
    };

    return (
        <VeterinariaContext.Provider value={ valoresContexto }>
            {children}
        </VeterinariaContext.Provider>
    );
}
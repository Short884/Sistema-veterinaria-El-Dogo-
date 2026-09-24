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
            // El backend (veterinaria-backend) espera { email, passwordPlain }
            // y responde con { user, token }
            const respuesta = await api.post('auth/login', {
                email: correoElectronico,
                passwordPlain: contrasena
            });

            const { token, user } = respuesta.data;

            localStorage.setItem('tokenAcceso', token);
            localStorage.setItem('datosUsuario', JSON.stringify(user));

            setUsuarioActual(user);

            return { exito: true };
        } catch (error) {
            const mensajeBackend = error.response?.data?.message;
            const mensajeError = Array.isArray(mensajeBackend)
                ? mensajeBackend.join(', ')
                : (mensajeBackend || 'Error al iniciar la sesión');
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

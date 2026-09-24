import { useState, useEffect } from "react";
import { VeterinariaContext } from "./VeterinariaContext";
import api from "../api/axios";
import { useAutenticacion } from "../hooks/useAutenticacion";

// Extrae un mensaje legible de un error de Axios/Nest (class-validator puede
// devolver 'message' como array de strings)
const extraerMensajeError = (error) => {
  const mensaje = error.response?.data?.message;
  if (Array.isArray(mensaje)) return mensaje.join(', ');
  return mensaje || 'Ocurrió un error inesperado. Revisá la consola para más detalles.';
};

export const VeterinariaProvider = ({ children }) => {
  // Se lee ANTES de renderizar el propio Provider, por lo que todavía toma el
  // AutenticacionProvider de más arriba (no colisiona con este mismo contexto).
  // Se reexpone en 'value' para que VistaClientes, ClienteItem, etc. (que
  // quedan anidados dentro de este Provider) puedan saber qué rol tiene el
  // usuario logueado sin volver a llamar useAutenticacion() ahí adentro.
  const { usuarioActual } = useAutenticacion();

  // CLIENTES
  const [clientes, setClientes] = useState([]);
  // MASCOTAS
  const [mascotas, setMascotas] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // Lógica de carga de datos inicial (GET - READ)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Peticiones simultáneas para Clientes y Mascotas
        const [clientesRes, mascotasRes] = await Promise.all([
          api.get('/clientes'),
          api.get('/mascotas')
        ]);

        setClientes(clientesRes.data);
        setMascotas(mascotasRes.data);
      } catch (error) {
        console.error("Error al cargar los datos desde la API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Funciones de Clientes (CREATE, UPDATE, DELETE)

  // nuevoCliente puede ser un objeto plano o un FormData (cuando incluye foto)
  const agregarNuevoCliente = async (nuevoCliente) => {
    try {
      const response = await api.post('/clientes', nuevoCliente);
      setClientes([...clientes, response.data]);
    } catch (error) {
      console.error("Error al agregar el cliente: ", error);
      alert(extraerMensajeError(error));
    }
  };

  const eliminarCliente = async (clienteId) => {
    try {
      await api.delete(`/clientes/${clienteId}`);
      const listaActualizada = clientes.filter(cliente =>
        cliente.id !== clienteId
      );
      setClientes(listaActualizada);
    } catch (error) {
      console.error("Error al eliminar el cliente: ", error);
      alert(extraerMensajeError(error));
    }
  };

  const actualizarCliente = async (clienteActualizado) => {
    try {
      // El backend documenta PATCH (no PUT) para edición
      const respuesta = await api.patch(`/clientes/${clienteActualizado.id}`, clienteActualizado);
      const listaActualizada = clientes.map(cliente =>
        cliente.id === clienteActualizado.id ? respuesta.data : cliente
      );
      setClientes(listaActualizada);
    } catch (error) {
      console.error("Error al actualizar el cliente: ", error);
      alert(extraerMensajeError(error));
    }
  };

  // Funciones de Mascotas (CREATE, UPDATE, DELETE)

  // nuevaMascota puede ser un objeto plano o un FormData (cuando incluye foto)
  const agregarMascota = async (nuevaMascota) => {
    try {
      const response = await api.post('/mascotas', nuevaMascota);
      setMascotas([...mascotas, response.data]);
    } catch (error) {
      console.error("Error al agregar la mascota: ", error);
      alert(extraerMensajeError(error));
    }
  };

  const eliminarMascota = async (mascotaId) => {
    try {
      await api.delete(`/mascotas/${mascotaId}`);
      const listaActualizada = mascotas.filter(
        (mascota) => mascota.id !== mascotaId
      );
      setMascotas(listaActualizada);
    } catch (error) {
      console.error("Error al eliminar la mascota: ", error);
      alert(extraerMensajeError(error));
    }
  };

  const actualizarMascota = async (mascotaActualizada) => {
    try {
      const respuesta = await api.patch(`/mascotas/${mascotaActualizada.id}`, mascotaActualizada);
      const listaActualizada = mascotas.map((mascota) =>
        mascota.id === mascotaActualizada.id ? respuesta.data : mascota
      );
      setMascotas(listaActualizada);
    } catch (error) {
      console.error("Error al actualizar la mascota: ", error);
      alert(extraerMensajeError(error));
    }
  };

  const value = {
    isLoading,
    usuarioActual,
    // Clientes
    clientes,
    agregarNuevoCliente,
    actualizarCliente,
    eliminarCliente,
    // Mascotas
    mascotas,
    agregarMascota,
    actualizarMascota,
    eliminarMascota
  }

  return (
    <VeterinariaContext.Provider value={value}>
      {children}
    </VeterinariaContext.Provider>
  )
}

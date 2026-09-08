import { useState, useEffect } from "react";
import { VeterinariaContext } from "./VeterinariaContext";
import api from "../api/axios";

export const VeterinariaProvider = ({ children }) => {
  // CLIENTES
  const [clientes, setClientes] = useState([]);
  // MASCOTAS
  const [mascotas, setMascotas] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // Lógica de carga de datos inicial (GET - READ)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Peticiones simultáneaas para Clientes y Mascotas
        const [clientesRes, mascotasRes] = await Promise.all ([
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
  const agregarNuevoCliente = async (nuevoCliente) => {
    try {
      const response = await api.post('/clientes', nuevoCliente);
      setClientes([...clientes, response.data]);
    } catch (error) {
      console.error("Error al agregar el cliente: ", error);
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
    }
  };

  const actualizarCliente = async (clienteActualizado) => {
    try {
      await api.put(`/clientes/${clienteActualizado.id}`, clienteActualizado);
      const listaActualizada = clientes.map(cliente => {
        if (cliente.id === clienteActualizado.id) {
          return clienteActualizado;
        } 
      });
      setClientes(listaActualizada);
    } catch (error) {
      console.error("Error al actualizar el cliente: ", error);
    }
  };  

  useEffect(() => {
    console.log("Detectando cambios en la lista de clientes. ¡Guardando!");
    localStorage.setItem('clientesDogo', JSON.stringify(clientes));
  }, [clientes]);

    const agregarMascota = (nuevaMascota) => {
        setMascotas([...mascotas, nuevaMascota]);
    }

    const eliminarMascota = (mascotaId) => {
        const listaActualizada = mascotas.filter(
            (mascota) => mascota.id !== mascotaId
        );

        setMascotas(listaActualizada);
    }

    const actualizarMascota = (mascotaActualizada) => {
        const listaActualizada = mascotas.map((mascota) => {
            if(mascota.id === mascotaActualizada.id) {
                return mascotaActualizada
            }
            return mascota;
        });

        setMascotas(listaActualizada);
    }

    useEffect(() => {
        console.log("Detectando cambios en la lista de mascotas. ¡Guardando!");
        localStorage.setItem("mascotasDogo", JSON.stringify(mascotas));
    }, [mascotas])

    const value = {
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
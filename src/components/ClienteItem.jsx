import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../api/axios";
import { VeterinariaContext } from "../context/VeterinariaContext";

function ClienteItem({ cliente, onEliminar, onGuardar }) {

    const { usuarioActual } = useContext(VeterinariaContext);
    const puedeEditar = usuarioActual?.rol === 'admin' || usuarioActual?.rol === 'veterinario';
    const puedeEliminar = usuarioActual?.rol === 'admin';

    const [esEdicion, setEsEdicion] = useState(false);

    const [nombreEditado, setNombreEditado] = useState(cliente.nombre);
    const [telefonoEditado, setTelefonoEditado] = useState(cliente.telefono);

    const manejadorEliminar = () => {
        if(window.confirm(`¿Seguro que desea eliminar a ${cliente.nombre}?`)) {
            onEliminar(cliente.id);
        }
    }

    const manejadorEditar = () => {
        setEsEdicion(true);
    }

    const manejadorGuardar = (e) => {
        e.preventDefault();
        const clienteActualizado = {
            ...cliente,
            nombre: nombreEditado,
            telefono: telefonoEditado
        };

        onGuardar(clienteActualizado);

        setEsEdicion(false);

    }

    return (
        <li key={cliente.id}>
            {
                esEdicion ? (
                    <form onSubmit={manejadorGuardar}>
                        <input 
                            type="text"
                            value={nombreEditado}
                            onChange={(e) => setNombreEditado(e.target.value)} 
                        />
                        <input 
                            type="text"
                            value={telefonoEditado}
                            onChange={(e) => setTelefonoEditado(e.target.value)} 
                        />
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={() => setEsEdicion(false)}>Cancelar</button>
                    </form>
                ) : (
                    <div>
                        {cliente.foto && (
                            <img
                                src={`${API_BASE_URL}/uploads/clientes/${cliente.foto}`}
                                alt={cliente.nombre}
                                style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', marginRight: '8px', verticalAlign: 'middle' }}
                            />
                        )}
                        <Link to={`/cliente/${cliente.id}`}>
                            <strong>** {cliente.nombre} {cliente.apellido} **</strong>
                        </Link>
                         - Teléfono: {cliente.telefono}
                        {puedeEditar && <button onClick={manejadorEditar}> 👍 Editar</button>}
                        {puedeEliminar && <button onClick={manejadorEliminar}> 💥 Eliminar</button>}
                    </div>
                )
            }
        </li>
    )
}

export default ClienteItem;

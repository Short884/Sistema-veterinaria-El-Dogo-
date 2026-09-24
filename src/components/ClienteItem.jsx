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
    const [apellidoEditado, setApellidoEditado] = useState(cliente.apellido);
    const [documentoEditado, setDocumentoEditado] = useState(cliente.documento);
    const [direccionEditada, setDireccionEditada] = useState(cliente.direccion);
    const [localidadEditada, setLocalidadEditada] = useState(cliente.localidad);
    const [telefonoEditado, setTelefonoEditado] = useState(cliente.telefono);
    const [emailEditado, setEmailEditado] = useState(cliente.email);
    // Nueva foto opcional para reemplazar la actual (null = no se toca)
    const [fotoEditada, setFotoEditada] = useState(null);

    const manejadorEliminar = () => {
        if(window.confirm(`¿Seguro que desea eliminar a ${cliente.nombre}?`)) {
            onEliminar(cliente.id);
        }
    }

    const manejadorEditar = () => {
        setEsEdicion(true);
    }

    const manejadorCambioFoto = (e) => {
        setFotoEditada(e.target.files[0]);
    }

    const manejadorGuardar = (e) => {
        e.preventDefault();

        // Igual que en el alta: FormData para poder viajar junto a la foto
        const datosFormulario = new FormData();
        datosFormulario.append('nombre', nombreEditado);
        datosFormulario.append('apellido', apellidoEditado);
        datosFormulario.append('documento', documentoEditado);
        datosFormulario.append('direccion', direccionEditada);
        datosFormulario.append('localidad', localidadEditada);
        datosFormulario.append('telefono', telefonoEditado);
        datosFormulario.append('email', emailEditado);
        if (fotoEditada) {
            // Solo se manda si el usuario eligió una foto nueva; si no, se conserva la actual
            datosFormulario.append('foto', fotoEditada);
        }

        onGuardar(cliente.id, datosFormulario);

        setFotoEditada(null);
        setEsEdicion(false);
    }

    return (
        <li key={cliente.id}>
            {
                esEdicion ? (
                    <form onSubmit={manejadorGuardar}>
                        <label>Nombre:
                            <input type="text" value={nombreEditado} onChange={(e) => setNombreEditado(e.target.value)} />
                        </label>
                        <label>Apellido:
                            <input type="text" value={apellidoEditado} onChange={(e) => setApellidoEditado(e.target.value)} />
                        </label>
                        <label>Documento:
                            <input type="text" value={documentoEditado} onChange={(e) => setDocumentoEditado(e.target.value)} />
                        </label>
                        <label>Dirección:
                            <input type="text" value={direccionEditada} onChange={(e) => setDireccionEditada(e.target.value)} />
                        </label>
                        <label>Localidad:
                            <input type="text" value={localidadEditada} onChange={(e) => setLocalidadEditada(e.target.value)} />
                        </label>
                        <label>Teléfono:
                            <input type="text" value={telefonoEditado} onChange={(e) => setTelefonoEditado(e.target.value)} />
                        </label>
                        <label>Correo electrónico:
                            <input type="email" value={emailEditado} onChange={(e) => setEmailEditado(e.target.value)} />
                        </label>
                        <label>Reemplazar foto (opcional):
                            <input type="file" accept="image/*" onChange={manejadorCambioFoto} />
                        </label>
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

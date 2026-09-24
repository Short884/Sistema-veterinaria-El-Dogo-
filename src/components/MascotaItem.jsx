import { useState, useContext } from "react";

import styles from './MascotaItem.module.css';
import { API_BASE_URL } from "../api/axios";
import { VeterinariaContext } from "../context/VeterinariaContext";

function MascotaItem ({clientes, mascota, onEliminar, onGuardar}) {

    const { usuarioActual } = useContext(VeterinariaContext);
    // El backend solo permite editar/eliminar mascotas a 'admin' y 'veterinario'
    const puedeGestionar = usuarioActual?.rol === 'admin' || usuarioActual?.rol === 'veterinario';

    const getDuenio = (id) => {
        const duenio = clientes.find((cliente) => cliente.id === id);
        return duenio ? `${duenio.nombre} ${duenio.apellido}` : "Dueño desconocido";
    };

    const [esEdicion, setEsEdicion] = useState(false);

    const[nombreEditado, setNombreEditado] = useState(mascota.nombre);
    const[especieEditado, setEspecieEditado] = useState(mascota.especie);
    const[razaEditado, setRazaEditado] = useState(mascota.raza);
    const[historiaClinicaEditada, setHistoriaClinicaEditada] = useState(mascota.historiaClinica || '');
    const[clientesIdEditado, setClientesIdEditado] = useState(mascota.clientesId);
    // Nueva foto opcional para reemplazar la actual (null = no se toca)
    const [fotoEditada, setFotoEditada] = useState(null);

    const manejadorEliminar = () => {
        if(window.confirm(`¿Seguro que quiere eliminar a ${mascota.nombre}?`)) {
            onEliminar(mascota.id);
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
        datosFormulario.append('especie', especieEditado);
        datosFormulario.append('raza', razaEditado);
        datosFormulario.append('historiaClinica', historiaClinicaEditada);
        datosFormulario.append('clientesId', clientesIdEditado);
        if (fotoEditada) {
            // Solo se manda si el usuario eligió una foto nueva; si no, se conserva la actual
            datosFormulario.append('foto', fotoEditada);
        }

        onGuardar(mascota.id, datosFormulario);

        setFotoEditada(null);
        setEsEdicion(false);
    }

    return (
        <li key={mascota.id} className={styles.tarjetaMascota}>
            {esEdicion ? (
                <form onSubmit={manejadorGuardar} className={styles.modoEdicion}>
                    <input 
                        type="text" 
                        value={nombreEditado}
                        onChange={(e) => setNombreEditado(e.target.value)}
                    />
                    <input 
                        type="text" 
                        value={especieEditado}
                        onChange={(e) => setEspecieEditado(e.target.value)}
                    />
                    <input 
                        type="text" 
                        value={razaEditado}
                        onChange={(e) => setRazaEditado(e.target.value)}
                    />
                    <select 
                        value={clientesIdEditado}
                        onChange={(e) => setClientesIdEditado(e.target.value)}
                    >
                        <option>--Seleccione un dueño--</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nombre} {cliente.apellido}
                            </option>
                        ))}
                    </select>
                    <label>
                        Historia clínica:
                        <textarea
                            value={historiaClinicaEditada}
                            onChange={(e) => setHistoriaClinicaEditada(e.target.value)}
                        />
                    </label>
                    <label>
                        Reemplazar foto (opcional):
                        <input type="file" accept="image/*" onChange={manejadorCambioFoto} />
                    </label>
                    <button type="submit">Guardar</button>
                    <button 
                        type="button"
                        onClick={() => setEsEdicion(false)}
                    >
                        Cancelar
                    </button>
                </form>
            ) : (
                <div className={styles.infoMascota}>
                    {mascota.foto && (
                        <img
                            src={`${API_BASE_URL}/uploads/mascotas/${mascota.foto}`}
                            alt={mascota.nombre}
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', marginRight: '10px' }}
                        />
                    )}
                    <strong className={styles.nombreMascota}>** {mascota.nombre } **</strong>
                    - Especie: {mascota.especie}
                    - Raza: {mascota.raza}
                    <span className={styles.duenio}>
                        - Dueño: {getDuenio(mascota.clientesId)}
                    </span>
                    {mascota.historiaClinica && (
                        <p className={styles.historiaClinica}>Historia clínica: {mascota.historiaClinica}</p>
                    )}
                    {puedeGestionar && (
                        <div className={styles.acciones}>
                            <button onClick={manejadorEditar}>Editar</button>
                            <button onClick={manejadorEliminar}>Eliminar</button>
                        </div>
                    )}
                </div>
            )}
        </li>
    )
}

export default MascotaItem;

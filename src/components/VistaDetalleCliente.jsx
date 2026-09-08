import { useContext } from 'react';
import { VeterinariaContext } from '../context/VeterinariaContext';

import { useParams, Link } from "react-router-dom";

function VistaDetalleCliente() {
    const {
        clientes,
        mascotas
    } = useContext(VeterinariaContext);

    const { id: clienteIdString } = useParams();
    const clienteId = Number(clienteIdString);

    const cliente = clientes.find(c => c.id === clienteId );
    const mascotasDelCliente = mascotas.filter(m => m.clienteId === clienteId);

    if(!cliente) {
        return <h2>Cliente no encontrado (ID: {clienteId})</h2>
    }

    return (
        <div>
            <Link to="/">Volver al listado de clientes</Link>

            <section>
                <h2>Cliente: {cliente.nombre}</h2>
                <p>Teléfono: **{cliente.telefono}**</p>
                <hr />
            </section>
            <section>
                <h3>Mascotas de {cliente.nombre} ({mascotasDelCliente.length})</h3>
                {mascotasDelCliente.length === 0 ? (
                    <p>Este cliente no tienen mascotas asociadas</p>
                ) : (
                    <ul>
                        {mascotasDelCliente.map(mascota => (
                            <li key={mascota.id}>
                                ** {mascota.nombre} ** - Especie: {mascota.especie}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>

    )

}

export default VistaDetalleCliente;
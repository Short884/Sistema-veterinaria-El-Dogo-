import { useContext } from 'react';
import { VeterinariaContext } from '../context/VeterinariaContext';
import FormularioCliente from './FormularioCliente';
import ClienteItem from './ClienteItem';

import styles from './VistaClientes.module.css';

function VistaClientes() {

  const {
    clientes,
    agregarNuevoCliente,
    actualizarCliente,
    eliminarCliente,
    usuarioActual
  } = useContext(VeterinariaContext);

  // El backend solo permite crear clientes a 'admin' y 'veterinario'
  const puedeCrear = usuarioActual?.rol === 'admin' || usuarioActual?.rol === 'veterinario';

  return (
    <div className={styles.contenedorPrincipal}>
          <section>
            <h2 className={styles.titulo}>Gestión de clientes</h2>
            <p className={styles.contador}>Cantidad de clientes: ** {clientes.length} **</p>
            <hr />
            {puedeCrear && <FormularioCliente onClienteAgregado={agregarNuevoCliente} />}
            <ul>
              {
              clientes.map((cliente) => (
                <ClienteItem 
                  key={cliente.id} 
                  cliente={cliente}
                  onEliminar={eliminarCliente}
                  onGuardar={actualizarCliente}
                />
              ))
              }
            </ul>
          </section>
        </div> 
  )
}

export default VistaClientes;

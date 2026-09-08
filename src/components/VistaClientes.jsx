import { useContext } from 'react';
import { VeterinariaContext } from '../context/VeterinariaContext';
import FormularioCliente from './FormularioCliente';
import ClienteItem from './clienteItem';

import styles from './VistaClientes.module.css';

function VistaClientes() {

  const {
    clientes,
    agregarNuevoCliente,
    actualizarCliente,
    eliminarCliente
  } = useContext(VeterinariaContext);
    

  return (
    <div className={styles.contenedorPrincipal}>
          <section>
            <h2 className={styles.titulo}>Gestión de clientes</h2>
            <p className={styles.contador}>Cantidad de clientes: ** {clientes.length} **</p>
            <hr />
            <FormularioCliente onClienteAgregado={agregarNuevoCliente} />
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
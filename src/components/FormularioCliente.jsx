import { useState } from "react";

function FormularioCliente({ onClienteAgregado }) {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');

    const manejadorNombre = (e) => {
        setNombre(e.target.value);
    } 
    const manejadorTelefono = (e) => {
        setTelefono(e.target.value);
    } 

    const manejadorEnviar = (e) => {
        e.preventDefault();

        if(nombre.trim() === '' || telefono.trim() === ''){
            alert('Complete todos los campos.');
            return;
        }

        const nuevoCliente = {
            id: Date.now(),
            nombre: nombre,
            telefono: telefono
        }

        console.log('¡Cliente listo para registrar!', nuevoCliente);

        onClienteAgregado(nuevoCliente);

        setNombre('');
        setTelefono('');
    }

    return (
        <form onSubmit={manejadorEnviar}>
            <h3>Nuevo cliente</h3>
            <label htmlFor="">Nombre completo:
                <input 
                type="text" 
                value={nombre} 
                onChange={manejadorNombre}
                required />
            </label>
            <label htmlFor="">Teléfono:
                <input 
                type="text" 
                value={telefono} 
                onChange={manejadorTelefono}
                required />
            </label>

            <button type="submit">Registrar Cliente</button>

        </form>
    )
}

export default FormularioCliente;
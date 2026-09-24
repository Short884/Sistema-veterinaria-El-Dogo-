import { useState } from "react";

function FormularioCliente({ onClienteAgregado }) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [documento, setDocumento] = useState('');
    const [direccion, setDireccion] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    // Archivo de foto seleccionado por el usuario (o null si no eligió ninguno)
    const [foto, setFoto] = useState(null);

    // Los archivos seleccionados vienen en un arreglo llamado files
    const manejadorCambioFoto = (e) => {
        setFoto(e.target.files[0]);
    }

    const manejadorEnviar = (e) => {
        e.preventDefault();

        if(!nombre.trim() || !apellido.trim() || !documento.trim() || !direccion.trim()
            || !localidad.trim() || !telefono.trim() || !email.trim()){
            alert('Complete todos los campos.');
            return;
        }

        // Empaquetamos los datos en FormData para poder viajar junto a la foto
        const datosFormulario = new FormData();
        datosFormulario.append('nombre', nombre);
        datosFormulario.append('apellido', apellido);
        datosFormulario.append('documento', documento);
        datosFormulario.append('direccion', direccion);
        datosFormulario.append('localidad', localidad);
        datosFormulario.append('telefono', telefono);
        datosFormulario.append('email', email);
        if (foto) {
            // 'foto' debe coincidir con el campo que espera Multer (FileInterceptor) en el backend
            datosFormulario.append('foto', foto);
        }

        onClienteAgregado(datosFormulario);

        setNombre('');
        setApellido('');
        setDocumento('');
        setDireccion('');
        setLocalidad('');
        setTelefono('');
        setEmail('');
        setFoto(null);
        e.target.reset();
    }

    return (
        <form onSubmit={manejadorEnviar}>
            <h3>Nuevo cliente</h3>
            <label>Nombre:
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </label>
            <label>Apellido:
                <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
            </label>
            <label>Documento:
                <input type="text" value={documento} onChange={(e) => setDocumento(e.target.value)} required />
            </label>
            <label>Dirección:
                <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
            </label>
            <label>Localidad:
                <input type="text" value={localidad} onChange={(e) => setLocalidad(e.target.value)} required />
            </label>
            <label>Teléfono:
                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
            </label>
            <label>Correo electrónico:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>Foto (opcional):
                <input type="file" accept="image/*" onChange={manejadorCambioFoto} />
            </label>

            <button type="submit">Registrar Cliente</button>

        </form>
    )
}

export default FormularioCliente;

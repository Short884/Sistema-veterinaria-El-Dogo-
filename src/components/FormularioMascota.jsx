import { useState } from "react";

function FormularioMascota ({clientes, onMascotaAgregada}) {

    const [nombre, setNombre] = useState('');
    const [especie, setEspecie] = useState('');
    const [raza, setRaza] = useState('');
    const [historiaClinica, setHistoriaClinica] = useState('');
    const [clientesId, setClientesId] = useState('');
    // Archivo de foto seleccionado por el usuario (o null si no eligió ninguno)
    const [foto, setFoto] = useState(null);

    // Los archivos seleccionados vienen en un arreglo llamado files
    const manejarCambioFoto = (e) => {
        setFoto(e.target.files[0]);
    };

    const manejadorSubmit = (e) => {
        e.preventDefault();

        if( !nombre || !especie || !clientesId ) {
            alert("Por favor, complete el nombre, especie y dueño");
            return;
        }

        // Empaquetamos los datos en FormData para poder viajar junto a la foto
        const datosFormulario = new FormData();
        datosFormulario.append('nombre', nombre);
        datosFormulario.append('especie', especie);
        datosFormulario.append('raza', raza);
        if (historiaClinica) {
            datosFormulario.append('historiaClinica', historiaClinica);
        }
        // El DTO del backend espera 'clientesId' (no 'clienteId')
        datosFormulario.append('clientesId', clientesId);
        if (foto) {
            // 'foto' debe coincidir con el campo que espera Multer (FileInterceptor) en el backend
            datosFormulario.append('foto', foto);
        }

        onMascotaAgregada(datosFormulario);

        setNombre('');
        setEspecie('');
        setRaza('');
        setHistoriaClinica('');
        setClientesId('');
        setFoto(null);
        e.target.reset();

    }

    return (
        <form onSubmit={manejadorSubmit}>
            <h3>Nueva Mascota</h3>
            <label>
                <select
                    value={clientesId}
                    onChange={(e) => setClientesId(e.target.value)}
                    required
                >
                    <option value="">-- Seleccione un dueño --</option>
                    {clientes.map(cliente => (
                        <option
                            key={cliente.id}
                            value={cliente.id}
                        >
                            {cliente.nombre} {cliente.apellido}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Nombre:
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </label>
            <label>
                Especie:
                <input
                    type="text"
                    value={especie}
                    onChange={(e) => setEspecie(e.target.value)}
                    required
                />
            </label>
            <label>
                Raza:
                <input
                    type="text"
                    value={raza}
                    onChange={(e) => setRaza(e.target.value)}
                    required
                />
            </label>
            <label>
                Historia clínica (opcional):
                <textarea
                    value={historiaClinica}
                    onChange={(e) => setHistoriaClinica(e.target.value)}
                />
            </label>
            <label>
                Foto (opcional):
                <input
                    type="file"
                    accept="image/*"
                    onChange={manejarCambioFoto}
                />
            </label>

            <button type="submit">Registrar mascota</button>
        </form>
    )
}

export default FormularioMascota;

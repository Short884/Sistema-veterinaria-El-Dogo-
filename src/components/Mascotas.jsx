import React, { useState } from 'react';

function Mascotas({ listaClientes, listaMascotas, onAgregarMascota, onEditarMascota, onEliminarMascota }) {
  const [form, setForm] = useState({ nombre: '', especie: '', raza: '', edad: '', salud: '', duenoId: '' });
  const [editandoId, setEditandoId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = (e) => {
    e.preventDefault();
    if (editandoId) {
      onEditarMascota({ ...form, id: editandoId });
      setEditandoId(null);
    } else {
      onAgregarMascota({ ...form, id: Date.now().toString() });
    }
    setForm({ nombre: '', especie: '', raza: '', edad: '', salud: '', duenoId: '' });
  };

  const prepararEdicion = (m) => {
    setEditandoId(m.id);
    setForm({ ...m });
  };

  const obtenerNombreDueno = (duenoId) => {
    const dueno = listaClientes.find(c => c.id === duenoId);
    return dueno ? dueno.nombre : '⚠️ Dueño Eliminado';
  };

  return (
    <div>
      <h3>{editandoId ? '✏️ Editando Mascota' : '➕ Nueva Mascota'}</h3>
      <form onSubmit={enviar} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
        <input name="nombre" placeholder="Nombre mascota *" value={form.nombre} onChange={handleChange} required />
        
        {/* Selector de Dueños (Cumple el requerimiento de cambio de dueño) */}
        <select name="duenoId" value={form.duenoId} onChange={handleChange} required>
          <option value="">-- Seleccionar Dueño * --</option>
          {listaClientes.map(c => (
            <option key={c.id} value={c.id}>{c.nombre} (DNI: {c.dni})</option>
          ))}
        </select>

        <input name="especie" placeholder="Especie (Ej: Perro)" value={form.especie} onChange={handleChange} />
        <input name="raza" placeholder="Raza" value={form.raza} onChange={handleChange} />
        <input name="edad" placeholder="Edad" value={form.edad} onChange={handleChange} />
        <input name="salud" placeholder="Problemas de salud" value={form.salud} onChange={handleChange} />
        
        <button type="submit">{editandoId ? 'Actualizar / Cambiar Dueño' : 'Guardar Mascota'}</button>
        {editandoId && <button type="button" onClick={() => {setEditandoId(null); setForm({ nombre: '', especie: '', raza: '', edad: '', salud: '', duenoId: '' });}}>Cancelar</button>}
      </form>

      <h3>🐾 Lista de Mascotas</h3>
      {listaMascotas.length === 0 ? <p>No hay mascotas registradas.</p> : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f4f4f4' }}>
            <tr><th>Nombre</th><th>Dueño Actual</th><th>Especie/Raza</th><th>Salud</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {listaMascotas.map(m => (
              <tr key={m.id}>
                <td><strong>{m.nombre}</strong></td>
                <td>{obtenerNombreDueno(m.duenoId)}</td>
                <td>{m.especie} - {m.raza}</td>
                <td>{m.salud}</td>
                <td>
                  <button onClick={() => prepararEdicion(m)} style={{ marginRight: '5px' }}>Editar / Cambiar Dueño</button>
                  <button onClick={() => onEliminarMascota(m.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Mascotas;
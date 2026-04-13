import React, { useState } from 'react';

function Clientes({ listaClientes, onAgregarCliente, onEditarCliente, onEliminarCliente }) {
  const [form, setForm] = useState({ nombre: '', dni: '', telefono: '', direccion: '', correo: '' });
  const [editandoId, setEditandoId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = (e) => {
    e.preventDefault();
    if (editandoId) {
      onEditarCliente({ ...form, id: editandoId });
      setEditandoId(null);
    } else {
      onAgregarCliente({ ...form, id: Date.now().toString() }); // ID único
    }
    setForm({ nombre: '', dni: '', telefono: '', direccion: '', correo: '' }); // Limpiar
  };

  const prepararEdicion = (c) => {
    setEditandoId(c.id);
    setForm({ ...c });
  };

  return (
    <div>
      <h3>{editandoId ? '✏️ Editando Cliente' : '➕ Nuevo Cliente'}</h3>
      <form onSubmit={enviar} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
        <input name="nombre" placeholder="Nombre completo *" value={form.nombre} onChange={handleChange} required />
        <input name="dni" placeholder="DNI *" value={form.dni} onChange={handleChange} required />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
        <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} />
        <input name="correo" type="email" placeholder="Correo" value={form.correo} onChange={handleChange} />
        <button type="submit">{editandoId ? 'Actualizar' : 'Guardar'}</button>
        {editandoId && <button type="button" onClick={() => {setEditandoId(null); setForm({ nombre: '', dni: '', telefono: '', direccion: '', correo: '' });}}>Cancelar</button>}
      </form>

      <h3>📋 Lista de Clientes</h3>
      {listaClientes.length === 0 ? <p>No hay clientes registrados.</p> : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f4f4f4' }}>
            <tr><th>Nombre</th><th>DNI</th><th>Teléfono</th><th>Dirección</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {listaClientes.map(c => (
              <tr key={c.id}>
                <td><strong>{c.nombre}</strong></td>
                <td>{c.dni}</td>
                <td>{c.telefono}</td>
                <td>{c.direccion}</td>
                <td>
                  <button onClick={() => prepararEdicion(c)} style={{ marginRight: '5px' }}>Editar</button>
                  <button onClick={() => onEliminarCliente(c.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Clientes;
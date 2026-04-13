import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import Clientes from './components/Clientes';
import Mascotas from './components/Mascotas';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [credenciales, setCredenciales] = useState({ user: '', pass: '' });
  
  // Estado Global (Base de datos en memoria)
  const [clientes, setClientes] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const navigate = useNavigate();

  // CU-01: Lógica de Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (credenciales.user === 'Ricardo' && credenciales.pass === '1234') {
      setUsuario('Ricardo');
      navigate('/clientes');
    } else {
      alert('Credenciales incorrectas. Usuario: Ricardo, Clave: 1234');
    }
  };

  // CU-02: Funciones Clientes (Alta, Baja, Modificación)
  const agregarCliente = (cliente) => setClientes([...clientes, cliente]);
  const editarCliente = (clienteEditado) => {
    setClientes(clientes.map(c => c.id === clienteEditado.id ? clienteEditado : c));
  };
  const eliminarCliente = (id) => {
    setClientes(clientes.filter(c => c.id !== id));
    // Eliminación en cascada: Si borro un cliente, borro sus mascotas
    setMascotas(mascotas.filter(m => m.duenoId !== id));
  };

  // CU-03: Funciones Mascotas (Alta, Baja, Modificación y Cambio de Dueño)
  const agregarMascota = (mascota) => setMascotas([...mascotas, mascota]);
  const editarMascota = (mascotaEditada) => {
    setMascotas(mascotas.map(m => m.id === mascotaEditada.id ? mascotaEditada : m));
  };
  const eliminarMascota = (id) => setMascotas(mascotas.filter(m => m.id !== id));

  // Vista de Login (Si no está logueado)
  if (!usuario) {
    return (
      <div style={{ padding: '40px', maxWidth: '350px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>🐾 Veterinaria El Dogo</h2>
        <h3>Acceso al Sistema</h3>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" placeholder="Usuario (Ricardo)" value={credenciales.user} 
            onChange={e => setCredenciales({...credenciales, user: e.target.value})} required 
          />
          <input 
            type="password" placeholder="Contraseña (1234)" value={credenciales.pass} 
            onChange={e => setCredenciales({...credenciales, pass: e.target.value})} required 
          />
          <button type="submit" style={{ padding: '10px', background: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer' }}>Ingresar</button>
        </form>
      </div>
    );
  }

  // Vista Principal (Logueado)
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <nav style={{ background: '#f4f4f4', padding: '15px', marginBottom: '20px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Hola, {usuario}</h2>
        <div>
          <Link to="/clientes" style={{ marginRight: '15px', textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>👤 Clientes</Link>
          <Link to="/mascotas" style={{ marginRight: '15px', textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>🐕 Mascotas</Link>
          <button onClick={() => { setUsuario(null); navigate('/'); }} style={{ cursor: 'pointer' }}>Cerrar Sesión</button>
        </div>
      </nav>

      {/* Aquí inyectamos los componentes y les pasamos TODAS sus funciones correctamente */}
      <Routes>
        <Route path="/clientes" element={
          <Clientes 
            listaClientes={clientes} 
            onAgregarCliente={agregarCliente} 
            onEditarCliente={editarCliente} 
            onEliminarCliente={eliminarCliente} 
          />
        } />
        <Route path="/mascotas" element={
          <Mascotas 
            listaClientes={clientes} 
            listaMascotas={mascotas} 
            onAgregarMascota={agregarMascota} 
            onEditarMascota={editarMascota} 
            onEliminarMascota={eliminarMascota} 
          />
        } />
        <Route path="*" element={<Navigate to="/clientes" />} />
      </Routes>
    </div>
  );
}

export default App;
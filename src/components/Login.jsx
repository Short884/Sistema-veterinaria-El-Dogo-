import { useState } from 'react';

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const manejarLogin = (e) => {
    e.preventDefault();
    if (usuario === 'Ricardo' && password === 'dogo123') {
      onLogin(usuario);
    } else {
      alert('Acceso denegado');
    }
  };

  return (
    <div className="login-screen">
      <form className="panel login-form" onSubmit={manejarLogin}>
        <h2>🔐 Acceso El Dogo</h2>
        <input type="text" placeholder="Usuario" value={usuario} onChange={e => setUsuario(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
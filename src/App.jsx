import { Routes, Route } from 'react-router-dom';

/* Autenticación */
import { AutenticacionProvider } from './context/AutenticacionProvider';
import { RutaProtegida } from './components/RutaProtegida';

/* Datos de la app */
import { VeterinariaProvider } from './context/VeterinariaProvider';

/* Componentes */
import Login from './components/Login';
import Navegacion from './components/Navegacion';
import VistaClientes from './components/VistaClientes';
import VistaMascotas from './components/VistaMascotas';
import VistaConfiguracion from './components/VistaConfiguracion';
import VistaDetalleCliente from './components/VistaDetalleCliente';

import './App.css';

function App() {
  const nombreApp = "El Dogo - Gestión de veterinaria";

  return (
    // Capa 1: el Contexto de Autenticación envuelve TODA la app.
    // Así cualquier componente sabe quién está logueado leyendo el token de localStorage.
    <AutenticacionProvider>
      <h1>{nombreApp}</h1>
      <p>¡Bienvenido! Acá se gestionan los Clientes y las Mascotas</p>

      <Routes>
        {/* Ruta pública: pantalla de Login */}
        <Route path="/login" element={<Login />} />

        {/* Todas las rutas dentro de este bloque pasan primero por el guardia RutaProtegida */}
        <Route element={<RutaProtegida />}>
          <Route
            path="/*"
            element={
              <>
                {/* Navegacion queda fuera de VeterinariaProvider para poder usar
                    useAutenticacion() (cerrarSesion, usuarioActual) sin que el
                    contexto de datos de la veterinaria lo tape */}
                <Navegacion />

                {/* Capa 2: Proveedor de Datos, activo solo cuando el usuario está autenticado */}
                <VeterinariaProvider>
                  <Routes>
                    <Route path="/" element={<VistaClientes />} />
                    <Route path="/cliente/:id" element={<VistaDetalleCliente />} />
                    <Route path="/mascotas" element={<VistaMascotas />} />
                    <Route path="/config" element={<VistaConfiguracion />} />
                    <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
                  </Routes>
                </VeterinariaProvider>
              </>
            }
          />
        </Route>
      </Routes>
    </AutenticacionProvider>
  )
}

export default App;

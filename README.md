<div align="center">

# 🐾 El Dogo — Veterinaria

### Sistema web para la gestión integral de una veterinaria

Construido con **React** y **Vite** — consume la API REST de la veterinaria, con autenticación JWT persistente y rutas protegidas.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

</div>

---

## 📋 Tabla de contenidos

- [Acerca del proyecto](#-acerca-del-proyecto)
- [Características principales](#-características-principales)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Requisitos previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Puesta en marcha](#-puesta-en-marcha)
- [Uso de la aplicación](#-uso-de-la-aplicación)
- [Rutas de la aplicación](#-rutas-de-la-aplicación)
- [Autenticación y sesión](#-autenticación-y-sesión)
- [Solución de problemas](#-solución-de-problemas)

---

## 📖 Acerca del proyecto

**El Dogo** es el frontend de gestión para una clínica veterinaria: permite iniciar sesión, administrar clientes (dueños), sus mascotas, y navegar entre ellos de forma protegida. Se conecta a una API REST hecha con NestJS/Express (según la versión de backend usada), consumiendo sus endpoints mediante Axios.

El proyecto está construido con **React** y **Vite**, usando Context API para el manejo de estado global (autenticación y datos), Hooks personalizados para encapsular la lógica de red, y **React Router** para la navegación y la protección de rutas privadas.

## ✨ Características principales

- 🔐 **Autenticación real contra la API** — login con correo y contraseña, sin claves estáticas.
- 🎟️ **Sesión persistente con JWT** — el token se guarda en `localStorage` y sobrevive a recargar la página (F5).
- 🛡️ **Rutas protegidas** — un componente guardia (`RutaProtegida`) impide el acceso a las pantallas privadas si no hay sesión activa, redirigiendo a `/login`.
- 🔌 **Interceptor de Axios** — el token se adjunta automáticamente como header `Authorization: Bearer <token>` en cada petición, sin tener que hacerlo a mano en cada componente.
- 🧠 **Estado global con Context API** — un contexto para la autenticación (`AutenticacionProvider`) y otro para los datos de la veterinaria (`VeterinariaProvider`).
- 🪝 **Hooks personalizados** — `useAutenticacion` y `useApi` centralizan el acceso al contexto y a las operaciones CRUD genéricas (GET, POST, PATCH, DELETE).
- 🧾 **Gestión de clientes y mascotas** — alta, edición en línea, eliminación con confirmación, y detalle de cliente con sus mascotas asociadas.
- 🚪 **Cierre de sesión** — botón de logout que limpia el token y los datos guardados, y redirige al login.

## 🛠 Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| [React](https://react.dev/) | Librería principal de la interfaz |
| [Vite](https://vitejs.dev/) | Bundler y servidor de desarrollo |
| [React Router DOM](https://reactrouter.com/) | Enrutamiento y protección de rutas |
| [Axios](https://axios-http.com/) | Cliente HTTP con interceptores |
| [ESLint](https://eslint.org/) | Linter para mantener calidad de código |

## 📁 Estructura del proyecto

```
src/
├── main.jsx                        # Punto de entrada, envuelve <App/> con BrowserRouter
├── App.jsx                         # Rutas públicas/privadas y providers globales
│
├── api/
│   └── axios.js                    # Instancia de Axios + interceptor que adjunta el token
│
├── context/
│   ├── VeterinariaContext.jsx       # Contexto compartido (createContext)
│   ├── AutenticacionProvider.jsx    # Login, logout y persistencia de sesión (JWT)
│   └── VeterinariaProvider.jsx      # Carga y CRUD de clientes y mascotas
│
├── hooks/
│   ├── useAutenticacion.js          # Acceso a usuarioActual / iniciarSesion / cerrarSesion
│   └── useApi.js                    # Hook genérico de CRUD (get, create, update, remove)
│
└── components/
    ├── Login.jsx                    # Pantalla de inicio de sesión
    ├── Navegacion.jsx               # Barra de navegación + usuario conectado + logout
    ├── RutaProtegida.jsx            # Guardia de rutas privadas
    ├── VistaClientes.jsx            # Listado y alta de clientes
    ├── VistaDetalleCliente.jsx      # Detalle de un cliente y sus mascotas
    ├── VistaMascotas.jsx            # Listado y alta de mascotas
    ├── VistaConfiguracion.jsx       # Pantalla de configuración
    ├── ClienteItem.jsx / FormularioCliente.jsx
    └── MascotaItem.jsx / FormularioMascota.jsx
```

## ✅ Requisitos previos

Antes de instalar, asegurate de tener lo siguiente:

- [Node.js](https://nodejs.org/) v18 o superior
- El **backend de la API** corriendo (ver el repositorio del backend para instalación y puesta en marcha)
- Un editor de código como [VS Code](https://code.visualstudio.com/)

## 🚀 Instalación

**1. Cloná el repositorio**

```bash
git clone https://github.com/tu-usuario/el-dogo-react.git
cd el-dogo-react
```

**2. Instalá las dependencias**

```bash
npm install
```

## ⚙️ Configuración

Este frontend apunta a la API a través de la instancia de Axios definida en `src/api/axios.js`:

```js
const api = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
        'Content-Type': 'application/json',
    }
});
```

> 💡 **Tip:** si tu backend corre en otro puerto o dirección, editá el valor de `baseURL` en ese archivo para que coincida.

## ▶️ Puesta en marcha

Con el backend corriendo y la `baseURL` configurada, levantá el servidor de desarrollo:

```bash
npm run dev
```

Si todo salió bien, vas a ver en la consola:

```
VITE ready in ... ms
➜  Local:   http://localhost:5173/
```

Abrí esa dirección en el navegador para acceder a la aplicación.

## 📡 Uso de la aplicación

### 1. Registrar un usuario

Como esta app no tiene pantalla de registro, primero creá un usuario directamente contra la API del backend (por ejemplo con Postman):

```http
POST http://localhost:4000/auth/register
Content-Type: application/json

{
  "correoElectronico": "admin@eldogo.com",
  "contrasena": "admin123456"
}
```

### 2. Iniciar sesión

Entrá a `http://localhost:5173/login` e ingresá el correo y la contraseña registrados. Si las credenciales son correctas, la app:

1. Guarda el token JWT en `localStorage` (`tokenAcceso`).
2. Guarda los datos del usuario en `localStorage` (`datosUsuario`).
3. Redirige automáticamente a la pantalla de clientes.

### 3. Navegar por la app

Una vez logueado, podés gestionar clientes y mascotas desde la barra de navegación. Si intentás acceder a una ruta privada sin sesión activa (por ejemplo, escribiendo la URL directamente), la app te redirige a `/login`.

## 🧭 Rutas de la aplicación

| Ruta | Componente | Acceso |
|---|---|---|
| `/login` | `Login` | Pública |
| `/` | `VistaClientes` | Requiere sesión |
| `/cliente/:id` | `VistaDetalleCliente` | Requiere sesión |
| `/mascotas` | `VistaMascotas` | Requiere sesión |
| `/config` | `VistaConfiguracion` | Requiere sesión |
| `*` | Página 404 | — |

## 🔐 Autenticación y sesión

- El login llama a `POST auth/login` con `correoElectronico` y `contrasena`, y espera como respuesta `{ tokenAcceso, usuario }`.
- El token y los datos del usuario se guardan en `localStorage`, por lo que la sesión se mantiene activa aunque se recargue la página.
- El interceptor de Axios (`src/api/axios.js`) agrega automáticamente el header `Authorization: Bearer <token>` en cada petición saliente, sin necesidad de hacerlo manualmente en cada componente.
- `RutaProtegida.jsx` verifica si hay un usuario autenticado antes de renderizar cualquier pantalla privada; si no lo hay, redirige a `/login`.
- Al cerrar sesión (`cerrarSesion()`), se elimina el token y los datos del usuario de `localStorage`, evitando que una recarga de página restaure una sesión ya cerrada.

## 🩺 Solución de problemas

<details>
<summary><strong>La pantalla de login dice "Error al iniciar la sesión"</strong></summary>

Verificá que el backend esté corriendo y que la `baseURL` en `src/api/axios.js` apunte a la dirección y puerto correctos. También revisá que el usuario exista y la contraseña sea correcta.
</details>

<details>
<summary><strong>Me redirige siempre a <code>/login</code> aunque acabo de loguearme</strong></summary>

Revisá en las herramientas de desarrollador del navegador (pestaña *Application* → *Local Storage*) que existan las claves `tokenAcceso` y `datosUsuario`. Si no aparecen, es probable que la respuesta del backend no tenga el formato `{ tokenAcceso, usuario }` esperado.
</details>

<details>
<summary><strong>Error de CORS en la consola del navegador</strong></summary>

El backend debe tener habilitado CORS para aceptar peticiones desde `http://localhost:5173`. Revisá la configuración de CORS del lado del servidor.
</details>

<details>
<summary><strong>401 Unauthorized al listar clientes o mascotas</strong></summary>

El token expiró o no se está enviando. Cerrá sesión y volvé a loguearte para obtener un token nuevo.
</details>

---

<div align="center">

Hecho con React

</div>

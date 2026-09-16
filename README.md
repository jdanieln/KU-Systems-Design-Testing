# Mini ERP - Starter Template (React + Flask + SQLite)

Proyecto base estructurado para un sistema ERP pequeño, compuesto por una interfaz web en React (Vite) y un backend en Python Flask con base de datos SQLite persistente.

---

## 📁 Estructura del Repositorio

```text
.
├── backend/                  # API en Python Flask + SQLite
│   ├── instance/
│   │   └── erp.db            # Base de datos SQLite local
│   ├── models.py             # Modelos SQLAlchemy (Product, Customer, Order)
│   ├── app.py                # Aplicación Flask, CORS y endpoints REST
│   ├── requirements.txt      # Dependencias del backend
│   └── README.md
├── frontend/                 # Interfaz de usuario en React + Vite
│   ├── src/
│   │   ├── App.jsx           # Dashboard del ERP con sidebar, KPIs y tablas
│   │   ├── App.css           # Estilos del ERP
│   │   ├── index.css         # Tokens de diseño y tipografía
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js        # Configuración de Vite con proxy a localhost:5000
├── asistencia/               # Registros de asistencia y verificación de entorno
└── README.md                 # Guía general de inicio
```

## 🎓 Para Estudiantes: Sincronización y Asistencia con Antigravity

Si estás usando **Antigravity**, puedes sincronizar tu entorno con la última versión del repositorio y registrar tu asistencia/verificación de configuración mediante un simple mensaje en el chat de Antigravity.

### 💬 Prompt para Antigravity

Copia y pega el siguiente mensaje en el chat de Antigravity (sustituyendo `<tu_usuario>` por tu nombre o usuario de GitHub):

```text
Sincroniza la última versión del repositorio y registra mi confirmación de asistencia y entorno con mi usuario: <tu_usuario>
```

#### 🤖 ¿Qué realiza Antigravity automáticamente?
1. **Actualiza tu código:** Ejecuta `git pull origin main` para descargar los últimos cambios de la clase.
2. **Verifica tus herramientas locales:** Revisa que `python3`, `node` y `npm` estén instalados y funcionando.
3. **Genera tu registro individual:** Crea o actualiza tu archivo en `asistencia/<tu_usuario>.md` con la fecha y versiones de tu entorno (evitando conflictos de merge entre compañeros).
4. **Crea el commit y lo sube:** Hace commit con tu nombre de usuario (`Asistencia: Confirmación de entorno de <tu_usuario>`) y ejecuta `git push origin main`.

<details>
<summary><b>🛠️ Ver comandos manuales equivalentes de Git</b></summary>

Si deseas realizar el proceso manualmente por terminal:
```bash
# 1. Bajar la última versión del repositorio
git pull origin main

# 2. Crear tu archivo de confirmación
mkdir -p asistencia
cat <<EOF > asistencia/<tu_usuario>.md
# Confirmación de Entorno y Asistencia
- **Estudiante / Usuario:** <tu_usuario>
- **Fecha:** $(date)
- **Python:** $(python3 --version 2>&1)
- **Node.js:** $(node -v 2>&1)
- **NPM:** $(npm -v 2>&1)
- **Estado:** Entorno verificado y sincronizado
EOF

# 3. Crear commit y subir al repositorio
git add asistencia/<tu_usuario>.md
git commit -m "Asistencia: Confirmación de entorno de <tu_usuario>"
git push origin main
```
</details>

---

## 🚀 Puesta en Marcha Rápida

Para correr el proyecto completo en desarrollo, necesitas ejecutar dos terminales:

### 1. Terminal 1: Backend (Flask + SQLite)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app.py
```
> La API quedará disponible en `http://localhost:5000`.

### 2. Terminal 2: Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```
> La aplicación web abrirá en `http://localhost:5173`.

---

## ✨ Características del Starter Template
- **Conexión Full-Stack lista**: El frontend detecta automáticamente si el backend está activo con indicador de salud en tiempo real.
- **SQLite Inicializado con Datos Semilla**: Al levantar el backend por primera vez, se generan datos de ejemplo para productos, clientes y pedidos.
- **CORS y Proxy Configurados**: Permite realizar peticiones relativas `/api/*` desde el frontend sin problemas de origen cruzado.
- **Diseño Moderno**: Panel estilo ERP con modo oscuro refinado, navegación lateral por módulos (Dashboard, Inventario, Clientes, Pedidos) y tablas interactivas.

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
└── README.md                 # Guía general de inicio
```

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

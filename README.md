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

## 🎓 Para Estudiantes: Asistencia y Actualización con Antigravity

No necesitas saber usar la terminal ni conocer comandos de Git. Al abrir este proyecto en **Antigravity**, simplemente escribe en el chat como si estuvieras conversando:

### 💬 ¿Qué puedes escribirle en el chat?

Puedes copiar o adaptar cualquiera de estos mensajes:

> **"Hola, actualiza mi proyecto con lo último del curso y registra mi asistencia. Mi nombre es `tu_nombre_o_usuario`"**

Otras formas naturales que también entiende:
- *"Pasa mi asistencia de hoy y descarga los cambios de la clase. Soy `tu_nombre`"*
- *"Revisa si mi entorno está listo para la clase y regístrame. Mi usuario de GitHub es `tu_usuario`"*
- O incluso solo: *"Hola, registra mi asistencia de hoy"* (Antigravity te preguntará amablemente tu nombre si no lo sabe y se encargará de todo).

#### 🪄 ¿Qué hace Antigravity automáticamente por ti?
Sin que tengas que escribir ningún comando en la terminal:
1. **Descarga lo último de la clase:** Actualiza tu proyecto con los cambios más recientes que haya subido el profesor.
2. **Revisa tu computadora:** Comprueba que tengas Python y Node.js correctamente instalados.
3. **Crea tu comprobante:** Registra un archivo individual en `asistencia/<tu_nombre>.md` para evitar cruces con tus compañeros.
4. **Lo sube a GitHub:** Guarda los cambios y los sube con tu nombre para que el profesor confirme tu asistencia y entorno.

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

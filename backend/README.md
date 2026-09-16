# Backend ERP (Python Flask + SQLite)

Starter template de la API para el sistema ERP con Python Flask, Flask-SQLAlchemy y SQLite.

## Requisitos previos
- Python 3.9+

## Instalación y Ejecución

1. **Crear y activar el entorno virtual:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Instalar dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Ejecutar el servidor API:**
   ```bash
   python3 app.py
   ```
   El servidor estará disponible en `http://localhost:5000`.

## Base de Datos SQLite
La base de datos se genera automáticamente en `instance/erp.db` con tablas y datos semilla de ejemplo (`Product`, `Customer`, `Order`) al iniciar por primera vez.

## Endpoints de la API
- `GET /api/health`: Estado de salud de la API y verificación de conexión SQLite.
- `GET /api/summary`: Métricas de resumen (total productos, clientes, pedidos, ingresos).
- `GET /api/products`: Lista de productos en inventario.
- `POST /api/products`: Crear un nuevo producto.
- `GET /api/customers`: Lista de clientes registrados.
- `POST /api/customers`: Registrar un nuevo cliente.
- `GET /api/orders`: Lista de órdenes y facturas.

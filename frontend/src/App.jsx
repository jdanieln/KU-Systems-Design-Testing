import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [apiStatus, setApiStatus] = useState('checking'); // checking | online | offline
  const [apiDetails, setApiDetails] = useState(null);
  
  const [summary, setSummary] = useState({
    total_products: 0,
    total_customers: 0,
    total_orders: 0,
    total_revenue: 0,
    low_stock_count: 0
  });

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Formulario rápido para nuevo producto
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [productForm, setProductForm] = useState({
    sku: '',
    name: '',
    category: 'Tecnología',
    price: '',
    stock: ''
  });

  const checkHealthAndLoadData = async () => {
    setLoading(true);
    try {
      // 1. Health check
      const healthRes = await fetch('/api/health');
      if (!healthRes.ok) throw new Error('API offline');
      const healthData = await healthRes.json();
      setApiStatus('online');
      setApiDetails(healthData);

      // 2. Fetch Summary
      const summaryRes = await fetch('/api/summary');
      if (summaryRes.ok) {
        const summaryData = await summaryRes.json();
        setSummary(summaryData);
      }

      // 3. Fetch Products
      const prodRes = await fetch('/api/products');
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData);
      }

      // 4. Fetch Customers
      const custRes = await fetch('/api/customers');
      if (custRes.ok) {
        const custData = await custRes.json();
        setCustomers(custData);
      }

      // 5. Fetch Orders
      const orderRes = await fetch('/api/orders');
      if (orderRes.ok) {
        const orderData = await orderRes.json();
        setOrders(orderData);
      }
    } catch (err) {
      console.warn('Backend no disponible:', err);
      setApiStatus('offline');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealthAndLoadData();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productForm,
          price: parseFloat(productForm.price) || 0,
          stock: parseInt(productForm.stock, 10) || 0
        })
      });

      if (res.ok) {
        setProductForm({ sku: '', name: '', category: 'Tecnología', price: '', stock: '' });
        setShowNewProductModal(false);
        checkHealthAndLoadData();
      } else {
        const err = await res.json();
        alert(err.error || 'Error al crear producto');
      }
    } catch (err) {
      alert('Error de conexión con el backend');
    }
  };

  return (
    <div className="erp-container">
      {/* Sidebar Lateral */}
      <aside className="erp-sidebar">
        <div className="erp-brand">
          <div className="brand-icon">E</div>
          <div className="brand-name">ERP Core</div>
          <span className="brand-badge">Lite</span>
        </div>

        <nav className="erp-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </button>
          
          <button
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <span className="nav-icon">📦</span>
            <span>Inventario</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            <span className="nav-icon">👥</span>
            <span>Clientes</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <span className="nav-icon">📑</span>
            <span>Pedidos</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <strong>Stack Mini ERP</strong>
          <span>React 18 + Flask + SQLite</span>
        </div>
      </aside>

      {/* Área Principal */}
      <div className="erp-main">
        <header className="erp-header">
          <div className="header-title-group">
            <h1>
              {activeTab === 'dashboard' && 'Panel General'}
              {activeTab === 'products' && 'Gestión de Inventario'}
              {activeTab === 'customers' && 'Directorio de Clientes'}
              {activeTab === 'orders' && 'Registro de Pedidos'}
            </h1>
            <p>Starter Template de Gestión Empresarial</p>
          </div>

          <div className="header-actions">
            <div className={`status-badge ${apiStatus}`}>
              <span className="status-dot"></span>
              <span>
                {apiStatus === 'online' && `API Conectada (${apiDetails?.database || 'SQLite'})`}
                {apiStatus === 'offline' && 'API Desconectada'}
                {apiStatus === 'checking' && 'Verificando API...'}
              </span>
            </div>

            <button 
              className="btn btn-secondary" 
              onClick={checkHealthAndLoadData}
              disabled={loading}
              title="Recargar datos desde la API"
            >
              🔄 {loading ? 'Cargando...' : 'Actualizar'}
            </button>
          </div>
        </header>

        <main className="erp-content">
          {apiStatus === 'offline' && (
            <div className="alert-banner warning">
              <span>
                ⚠️ <strong>Backend no detectado:</strong> Asegúrate de que el servidor Flask esté corriendo en <code>http://localhost:5000</code>.
              </span>
              <button className="btn btn-secondary" onClick={checkHealthAndLoadData}>Reintentar</button>
            </div>
          )}

          {/* Tarjetas KPI Superiores */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-title">Ingresos Totales</span>
                <span className="metric-icon">💰</span>
              </div>
              <div className="metric-value">${summary.total_revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <span className="metric-meta">Órdenes completadas</span>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-title">Productos en Catálogo</span>
                <span className="metric-icon">📦</span>
              </div>
              <div className="metric-value">{summary.total_products}</div>
              <span className="metric-meta">{summary.low_stock_count} con stock bajo (≤10)</span>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-title">Clientes Registrados</span>
                <span className="metric-icon">👥</span>
              </div>
              <div className="metric-value">{summary.total_customers}</div>
              <span className="metric-meta">Directorio activo</span>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-title">Pedidos Totales</span>
                <span className="metric-icon">📑</span>
              </div>
              <div className="metric-value">{summary.total_orders}</div>
              <span className="metric-meta">Gestionados</span>
            </div>
          </div>

          {/* Vistas Dinámicas según Tab */}

          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="section-panel">
              <div className="panel-header">
                <h2 className="panel-title">Resumen de Inventario Reciente</h2>
                <button className="btn btn-primary" onClick={() => setActiveTab('products')}>
                  Ir a Inventario Completo →
                </button>
              </div>

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>SKU</th>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 4).map((p) => (
                      <tr key={p.id}>
                        <td><code>{p.sku}</code></td>
                        <td><strong>{p.name}</strong></td>
                        <td><span className="tag-badge category">{p.category}</span></td>
                        <td>${p.price.toFixed(2)}</td>
                        <td>{p.stock} uds.</td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan="5" className="empty-state">
                          No hay productos registrados en SQLite o la API no está conectada.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: INVENTARIO / PRODUCTOS */}
          {activeTab === 'products' && (
            <div className="section-panel">
              <div className="panel-header">
                <h2 className="panel-title">Catálogo de Productos ({products.length})</h2>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowNewProductModal(!showNewProductModal)}
                >
                  {showNewProductModal ? 'Cerrar Formulario' : '+ Nuevo Producto'}
                </button>
              </div>

              {showNewProductModal && (
                <form onSubmit={handleCreateProduct} style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-app)', borderRadius: '8px' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '14px' }}>Agregar Producto a SQLite</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>SKU</label>
                      <input 
                        className="form-control" 
                        required
                        placeholder="Ej. PRD-006"
                        value={productForm.sku}
                        onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Nombre</label>
                      <input 
                        className="form-control" 
                        required
                        placeholder="Nombre del artículo"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Categoría</label>
                      <input 
                        className="form-control" 
                        placeholder="Tecnología, Mobiliario..."
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Precio ($)</label>
                      <input 
                        type="number"
                        step="0.01"
                        className="form-control" 
                        required
                        placeholder="0.00"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Stock</label>
                      <input 
                        type="number"
                        className="form-control" 
                        required
                        placeholder="0"
                        value={productForm.stock}
                        onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowNewProductModal(false)}>Cancelar</button>
                    <button type="submit" className="btn btn-primary">Guardar en Base de Datos</button>
                  </div>
                </form>
              )}

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>SKU</th>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td>#{p.id}</td>
                        <td><code>{p.sku}</code></td>
                        <td><strong>{p.name}</strong></td>
                        <td><span className="tag-badge category">{p.category}</span></td>
                        <td>${p.price.toFixed(2)}</td>
                        <td>
                          <span style={{ color: p.stock <= 10 ? 'var(--warning)' : 'inherit', fontWeight: p.stock <= 10 ? 600 : 400 }}>
                            {p.stock} unidades
                          </span>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan="6" className="empty-state">No hay productos registrados.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CLIENTES */}
          {activeTab === 'customers' && (
            <div className="section-panel">
              <div className="panel-header">
                <h2 className="panel-title">Clientes Registrados ({customers.length})</h2>
              </div>

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Empresa</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c) => (
                      <tr key={c.id}>
                        <td>#{c.id}</td>
                        <td><strong>{c.name}</strong></td>
                        <td>{c.company || '—'}</td>
                        <td>{c.email}</td>
                        <td>{c.phone || '—'}</td>
                      </tr>
                    ))}
                    {customers.length === 0 && (
                      <tr>
                        <td colSpan="5" className="empty-state">No hay clientes registrados.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: PEDIDOS */}
          {activeTab === 'orders' && (
            <div className="section-panel">
              <div className="panel-header">
                <h2 className="panel-title">Pedidos y Órdenes ({orders.length})</h2>
              </div>

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>N° Orden</th>
                      <th>Cliente</th>
                      <th>Total</th>
                      <th>Estado</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id}>
                        <td><code>{o.order_number}</code></td>
                        <td><strong>{o.customer_name || `Cliente #${o.customer_id}`}</strong></td>
                        <td>${o.total_amount.toFixed(2)}</td>
                        <td>
                          <span className={`tag-badge status-${o.status.toLowerCase()}`}>
                            {o.status}
                          </span>
                        </td>
                        <td>{o.created_at ? new Date(o.created_at).toLocaleDateString() : '—'}</td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan="5" className="empty-state">No hay órdenes registradas.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

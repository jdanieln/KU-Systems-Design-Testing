import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Product, Customer, Order

def create_app():
    app = Flask(__name__)
    
    # Configuración de base de datos SQLite
    base_dir = os.path.abspath(os.path.dirname(__file__))
    db_path = os.path.join(base_dir, 'instance', 'erp.db')
    os.makedirs(os.path.join(base_dir, 'instance'), exist_ok=True)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Habilitar CORS para permitir llamadas desde el frontend en desarrollo
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    db.init_app(app)

    with app.app_context():
        db.create_all()
        seed_initial_data()

    # --- Rutas API ---
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            'status': 'online',
            'service': 'Mini ERP Flask API',
            'database': 'SQLite Connected',
            'version': '1.0.0'
        })

    @app.route('/api/summary', methods=['GET'])
    def get_summary():
        total_products = Product.query.count()
        total_customers = Customer.query.count()
        total_orders = Order.query.count()
        low_stock_count = Product.query.filter(Product.stock <= 10).count()
        
        # Calcular ingresos de órdenes
        orders = Order.query.all()
        total_revenue = sum(order.total_amount for order in orders if order.status == 'Completed')

        return jsonify({
            'total_products': total_products,
            'total_customers': total_customers,
            'total_orders': total_orders,
            'low_stock_count': low_stock_count,
            'total_revenue': round(total_revenue, 2)
        })

    @app.route('/api/products', methods=['GET', 'POST'])
    def handle_products():
        if request.method == 'POST':
            data = request.get_json() or {}
            if not data.get('name') or not data.get('sku'):
                return jsonify({'error': 'Name and SKU are required'}), 400
            
            existing = Product.query.filter_by(sku=data['sku']).first()
            if existing:
                return jsonify({'error': f"Product with SKU '{data['sku']}' already exists"}), 400

            product = Product(
                sku=data['sku'],
                name=data['name'],
                category=data.get('category', 'General'),
                price=float(data.get('price', 0.0)),
                stock=int(data.get('stock', 0))
            )
            db.session.add(product)
            db.session.commit()
            return jsonify(product.to_dict()), 201

        products = Product.query.order_by(Product.id.desc()).all()
        return jsonify([p.to_dict() for p in products])

    @app.route('/api/customers', methods=['GET', 'POST'])
    def handle_customers():
        if request.method == 'POST':
            data = request.get_json() or {}
            if not data.get('name') or not data.get('email'):
                return jsonify({'error': 'Name and Email are required'}), 400
            
            customer = Customer(
                name=data['name'],
                email=data['email'],
                phone=data.get('phone'),
                company=data.get('company')
            )
            db.session.add(customer)
            db.session.commit()
            return jsonify(customer.to_dict()), 201

        customers = Customer.query.order_by(Customer.id.desc()).all()
        return jsonify([c.to_dict() for c in customers])

    @app.route('/api/orders', methods=['GET'])
    def handle_orders():
        orders = Order.query.order_by(Order.id.desc()).all()
        return jsonify([o.to_dict() for o in orders])

    return app

def seed_initial_data():
    """Siembra datos iniciales de prueba si la base de datos está vacía"""
    if Product.query.count() == 0:
        sample_products = [
            Product(sku="PRD-001", name="Laptop Pro 15\"", category="Tecnología", price=1299.99, stock=14),
            Product(sku="PRD-002", name="Monitor 4K 27\"", category="Tecnología", price=389.50, stock=8),
            Product(sku="PRD-003", name="Teclado Mecánico RGB", category="Accesorios", price=79.99, stock=42),
            Product(sku="PRD-004", name="Silla Ergonómica Desk", category="Mobiliario", price=249.00, stock=5),
            Product(sku="PRD-005", name="Mouse Inalámbrico", category="Accesorios", price=29.90, stock=65),
        ]
        db.session.add_all(sample_products)

    if Customer.query.count() == 0:
        sample_customers = [
            Customer(name="Empresa Alfa S.A.", email="contacto@alfa.com", phone="+506 8888-1111", company="Alfa Group"),
            Customer(name="Comercializadora Beta", email="ventas@beta.cr", phone="+506 8888-2222", company="Beta Imports"),
            Customer(name="Consultores Gamma", email="info@gamma.org", phone="+506 8888-3333", company="Gamma Solutions"),
        ]
        db.session.add_all(sample_customers)
        db.session.flush()

        if Order.query.count() == 0:
            sample_orders = [
                Order(order_number="ORD-2026-001", customer_id=1, total_amount=1689.49, status="Completed"),
                Order(order_number="ORD-2026-002", customer_id=2, total_amount=498.00, status="Pending"),
                Order(order_number="ORD-2026-003", customer_id=3, total_amount=109.89, status="Completed"),
            ]
            db.session.add_all(sample_orders)

    db.session.commit()

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)

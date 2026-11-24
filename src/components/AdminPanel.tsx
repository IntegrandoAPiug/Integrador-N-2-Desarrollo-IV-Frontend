import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';
import { useMessages } from '../context/MessagesContext';

const DEFAULT_IMG =
  'https://www.solopostres.com/wp-content/uploads/2025/06/Torta-humeda-de-chocolate-casera-800x800.jpg';

const AdminPanel = () => {
  const { logout } = useAuth();
  const { products, addProduct, deleteProduct } = useProducts();
  const { messages, toggleReadMessage, deleteMessage } = useMessages();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'productos' | 'mensajes'>('productos');

  // Estados del formulario de productos
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('Tortas');
  const [img, setImg] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [feedback, setFeedback] = useState('');

  const unreadCount = messages.filter((m) => !m.leido).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProductSubmit = (e: FormEvent) => {
    e.preventDefault();

    const parsedPrecio = Number(precio);
    const parsedStock = Number(stock);

    if (!nombre.trim() || parsedPrecio <= 0 || parsedStock < 0) return;

    addProduct({
      nombre: nombre.trim(),
      precio: parsedPrecio,
      stock: parsedStock,
      categoria,
      img: img.trim() || DEFAULT_IMG,
      descripcion:
        descripcion.trim() || 'Deliciosa preparación artesanal de Capital Cake.',
    });

    setNombre('');
    setPrecio('');
    setStock('');
    setCategoria('Tortas');
    setImg('');
    setDescripcion('');
    setFeedback('Producto agregado al catálogo.');
    setTimeout(() => setFeedback(''), 3000);
  };

  return (
    <section className="admin-section">
      <div className="admin-header">
        <div>
          <span className="contact-badge">Panel Admin</span>
          <h2>Administración Capital Cake</h2>
        </div>
        <button type="button" onClick={handleLogout} className="clear-btn">
          Cerrar Sesión
        </button>
      </div>

      {/* Pestañas de navegación interna */}
      <div className="admin-tabs">
        <button
          type="button"
          className={`admin-tab-btn ${activeTab === 'productos' ? 'active' : ''}`}
          onClick={() => setActiveTab('productos')}
        >
          Productos ({products.length})
        </button>
        <button
          type="button"
          className={`admin-tab-btn ${activeTab === 'mensajes' ? 'active' : ''}`}
          onClick={() => setActiveTab('mensajes')}
        >
          Mensajes ({messages.length})
          {unreadCount > 0 && <span className="admin-badge-count">{unreadCount}</span>}
        </button>
      </div>

      {activeTab === 'productos' ? (
        <div className="admin-layout">
          <form onSubmit={handleProductSubmit} className="admin-form-card">
            <h3>Agregar Producto</h3>

            {feedback && <p className="form-success">{feedback}</p>}

            <div className="login-group">
              <label htmlFor="prod-nombre" className="form-label">Nombre</label>
              <input
                id="prod-nombre"
                type="text"
                className="login-input"
                placeholder="Ej: Torta Brownie"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="admin-row">
              <div className="login-group">
                <label htmlFor="prod-precio" className="form-label">Precio ($)</label>
                <input
                  id="prod-precio"
                  type="number"
                  min="1"
                  className="login-input"
                  placeholder="18000"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />
              </div>

              <div className="login-group">
                <label htmlFor="prod-stock" className="form-label">Stock</label>
                <input
                  id="prod-stock"
                  type="number"
                  min="0"
                  className="login-input"
                  placeholder="10"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-group">
              <label htmlFor="prod-categoria" className="form-label">Categoría</label>
              <select
                id="prod-categoria"
                className="login-input"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="Tortas">Tortas</option>
                <option value="Tartas">Tartas</option>
                <option value="Alfajores">Alfajores</option>
                <option value="Galletas">Galletas</option>
              </select>
            </div>

            <div className="login-group">
              <label htmlFor="prod-img" className="form-label">URL de Imagen</label>
              <input
                id="prod-img"
                type="url"
                className="login-input"
                placeholder="https://... (opcional)"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
            </div>

            <div className="login-group">
              <label htmlFor="prod-desc" className="form-label">Descripción</label>
              <textarea
                id="prod-desc"
                rows={3}
                className="login-input admin-textarea"
                placeholder="Contá brevemente cómo es..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <button type="submit" className="login-btn">
              Guardar Producto
            </button>
          </form>

          <div className="admin-list-card">
            <h3>Productos actuales ({products.length})</h3>

            <div className="admin-product-list">
              {products.map((item) => (
                <div key={item.id} className="admin-product-item">
                  <img
                    src={item.img}
                    alt={item.nombre}
                    className="admin-product-thumb"
                  />
                  <div className="admin-product-info">
                    <strong>{item.nombre}</strong>
                    <span>
                      {item.categoria} · Stock: {item.stock} · ${item.precio.toLocaleString('es-AR')}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteProduct(item.id)}
                    className="admin-delete-btn"
                    title="Eliminar producto"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="admin-messages-card">
          <h3>Consultas y mensajes recibidos</h3>

          {messages.length === 0 ? (
            <p className="admin-empty-msg">No hay mensajes por el momento.</p>
          ) : (
            <div className="admin-messages-list">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`admin-message-item ${!msg.leido ? 'unread' : ''}`}
                >
                  <div className="admin-message-top">
                    <div>
                      <strong>{msg.nombre}</strong>
                      <span className="admin-message-email"> · {msg.email}</span>
                    </div>
                    <span className="admin-message-date">{msg.fecha}</span>
                  </div>

                  <p className="admin-message-body">{msg.mensaje}</p>

                  <div className="admin-message-actions">
                    <button
                      type="button"
                      onClick={() => toggleReadMessage(msg.id)}
                      className="admin-secondary-btn"
                    >
                      {msg.leido ? 'Marcar no leído' : 'Marcar leído'}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteMessage(msg.id)}
                      className="admin-delete-btn"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default AdminPanel;
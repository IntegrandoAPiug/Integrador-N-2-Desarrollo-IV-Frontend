import { useState, useEffect } from 'react'
import { useCart } from '../Hooks/useCart'

const Cart = () => {
  const {
    items,
    removeFromCart,
    clearCart,
    checkout,
    getPedidos,
    getItemSubtotal,
    getTotalCart,
  } = useCart()

  const [compraFinalizada, setCompraFinalizada] = useState(false)
  const [procesando, setProcesando] = useState(false)
  const [errorCheckout, setErrorCheckout] = useState('')
  const [pedidos, setPedidos] = useState<any[]>([])

  const cargarHistorial = async () => {
    try {
      const lista = await getPedidos()
      setPedidos(lista)
    } catch (err) {
      console.error('Error al cargar historial de pedidos:', err)
    }
  }

  useEffect(() => {
    cargarHistorial()
  }, [])

  const handleFinalizarCompra = async () => {
    setErrorCheckout('')
    setProcesando(true)
    try {
      await checkout()
      setCompraFinalizada(true)
      await cargarHistorial()
    } catch (err: any) {
      setErrorCheckout(err.message || 'No se pudo procesar el pedido.')
    } finally {
      setProcesando(false)
    }
  }

  useEffect(() => {
    if (compraFinalizada) {
      const timer = setTimeout(() => {
        setCompraFinalizada(false)
      }, 7000)

      return () => clearTimeout(timer)
    }
  }, [compraFinalizada])

  return (
    <div className="cart">
      {compraFinalizada && (
        <div className="toast-container">
          <div className="toast-box" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="toast-title">Pastelería</strong>
              <small className="toast-time">ahora mismo</small>
              <button
                type="button"
                className="toast-close"
                aria-label="Cerrar"
                onClick={() => setCompraFinalizada(false)}
              >
                ✕
              </button>
            </div>
            <div className="toast-body">
              ¡Compra finalizada con éxito! Tu pedido fue registrado.
            </div>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="cart-empty">
          <h2>Tu carrito está vacío</h2>
          <p className="cart-empty-sub">¡Agregá algunos pasteles deliciosos!</p>
        </div>
      ) : (
        <>
          <h2>Tu Carrito</h2>
          {errorCheckout && <p className="login-error">{errorCheckout}</p>}

          <ul className="cart-items">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.img} alt={item.nombre} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{item.nombre}</h3>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Subtotal: ${getItemSubtotal(item.id)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn btn-outline-secondary"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-total-suma">
            <h3>Total: ${getTotalCart()}</h3>
            <button onClick={clearCart} className="btn btn-outline-secondary" disabled={procesando}>
              Vaciar carrito
            </button>
            <button
              onClick={handleFinalizarCompra}
              className="btn btn-secondary"
              disabled={procesando}
            >
              {procesando ? 'Procesando...' : 'Finalizar compra'}
            </button>
          </div>
        </>
      )}

      {pedidos.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h3>Historial de Pedidos</h3>
          <ul className="cart-items">
            {pedidos.map((pedido) => (
              <li key={pedido.id} className="cart-item">
                <div className="cart-item-info">
                  <h4>Pedido #{pedido.id} — Estado: {pedido.estado}</h4>
                  <p>Total: ${pedido.total}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Cart
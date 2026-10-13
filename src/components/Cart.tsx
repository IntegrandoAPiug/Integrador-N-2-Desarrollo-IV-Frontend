import { useState, useEffect } from 'react'
import { useCart } from '../Hooks/useCart'

const Cart = () => {
  const { items, removeFromCart, clearCart, getItemSubtotal, getTotalCart } = useCart()
  const [compraFinalizada, setCompraFinalizada] = useState(false)

  const handleFinalizarCompra = () => {
    clearCart()
    setCompraFinalizada(true)
  }

  useEffect(() => {
    if (compraFinalizada) {
      const timer = setTimeout(() => {
        setCompraFinalizada(false)
      }, 7000)

      return () => clearTimeout(timer)
    }
  }, [compraFinalizada])

  if (compraFinalizada) {
  return (
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
          ¡Compra finalizada con éxito! Gracias por tu compra
        </div>
      </div>
    </div>
  )
}

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <p className="cart-empty-sub">¡Agregá algunos pasteles deliciosos!</p>
      </div>
    )
  }

  return (
    <div className="cart">
      <h2>Tu Carrito</h2>

      <ul className="cart-items">
        {items.map(item => (
          <li key={item.id} className="cart-item">
            <img src={item.img} alt={item.nombre} className="cart-item-img" />
            <div className="cart-item-info">
              <h3>{item.nombre}</h3>
              <p>Cantidad: {item.quantity}</p>
              <p>Subtotal: ${getItemSubtotal(item.id)}</p>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="btn btn-outline-secondary"> Quitar </button>
          </li>
        ))}
      </ul>

      <div className="cart-total-suma">
        <h3>Total: ${getTotalCart()}</h3>
        <button onClick={clearCart} className="btn btn-outline-secondary">
          Vaciar carrito
        </button>
        <button onClick={handleFinalizarCompra} className="btn btn-secondary"> Finalizar compra </button>
      </div>
    </div>
  )
}

export default Cart
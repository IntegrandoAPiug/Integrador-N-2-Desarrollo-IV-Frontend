import { useCart } from "../Hooks/useCart";
import type { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, items } = useCart();

  const cartItem = items.find((item) => item.id === product.id);
  const currentInCart = cartItem ? cartItem.quantity : 0;

  const lowStock = product.stock <= 5 && product.stock > 0;
  const outOfStock = product.stock <= 0;
  const canAdd = currentInCart < product.stock;

  const handleAdd = () => {
    if (!canAdd) {
      alert("Sin stock disponible");
      return;
    }

    addToCart(product, currentInCart + 1);
  };

  return (
    <div className="card h-100 shadow-sm">

      <img
        src={product.img}
        alt={product.nombre}
        className="card-img-top"
        style={{ height: "250px", objectFit: "cover" }}
      />

      <div className="card-header d-flex justify-content-between align-items-center">

        <span className="fw-bold">
          {product.categoria}
        </span>

        {outOfStock ? (
          <span className="badge bg-danger">
            Agotado
          </span>
        ) : lowStock ? (
          <span className="badge bg-warning text-dark">
            Quedan {product.stock}
          </span>
        ) : (
          <span className="badge bg-success">
            En stock
          </span>
        )}

      </div>

      <div className="card-body d-flex flex-column">

        <h5 className="card-title">
          {product.nombre}
        </h5>

        <p className="card-text">
          {product.descripcion}
        </p>

        <div className="mt-auto">

          <h4 className="text-primary fw-bold">
            ${product.precio.toLocaleString()}
          </h4>

          <button
            className="btn btn-primary w-100 mt-3"
            onClick={handleAdd}
            disabled={outOfStock || !canAdd}
          >
            {outOfStock ? "Agotado" : "Agregar al carrito"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;
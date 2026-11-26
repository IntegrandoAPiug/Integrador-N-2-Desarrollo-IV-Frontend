import { useProducts } from "../context/ProductsContext";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <p className="login-error">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <p>No se encontraron productos para tu búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="row g-4">

        {products.map((product) => (
          <div
            key={product.id}
            className="col-12 col-sm-6 col-lg-4 col-xl-3"
          >
            <ProductCard product={product} />
          </div>
        ))}

      </div>

    </div>
  );
};

export default ProductList;
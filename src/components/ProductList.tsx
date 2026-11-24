import { useProducts } from "../context/ProductsContext";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { products } = useProducts();

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
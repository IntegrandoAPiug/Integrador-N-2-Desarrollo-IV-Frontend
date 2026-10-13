import { useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from './ProductCard'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">✦ Horneado con amor cada día</span>
          <h1 className="hero-title">
            Dulces que endulzan
            <span className="hero-title-cursive"> cada momento</span>
          </h1>
          <p className="hero-description">
            Descubrí nuestra colección de tartas artesanales, tortas decoradas 
            y masitas únicas. Cada creación es una obra de arte comestible.
          </p>
        </div>
      </section>

      <section className="products-section">
        <h2 className="products-section-title">Nuestros Productos</h2>
        <div className="product-list">
          {products.slice(0,8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="products-section-btn">
          <button onClick={() => navigate('/productos')} className="ver-mas-btn">
            Ver todos los productos
          </button>
          </div>
      </section>
    </div>
  );
}

export default Home
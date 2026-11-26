import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../data/products';
import { apiFetch } from '../services/api';

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (queryParams?: string) => Promise<void>;
  addProduct: (newProduct: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (queryParams = '') => {
    try {
      setLoading(true);
      setError(null);
      // Pedimos page_size=100 para traer todo el catálogo o aplicamos filtros si vienen en queryParams
      const separator = queryParams ? (queryParams.startsWith('?') ? '&' : '?') : '?';
      const url = `/productos/${queryParams}${separator}page_size=100`;
      const data = await apiFetch<any>(url);
      
      // DRF con paginación devuelve { count, results: [...] }; sin paginación devuelve [...]
      const items = Array.isArray(data) ? data : data.results || [];
      setProducts(items);
    } catch (err: any) {
      console.error('Error al cargar productos:', err);
      setError(err.message || 'Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    const created = await apiFetch<Product>('/productos/', {
      method: 'POST',
      auth: true,
      body: JSON.stringify(newProduct),
    });
    setProducts((prev) => [created, ...prev]);
  };

  const deleteProduct = async (id: number) => {
    await apiFetch(`/productos/${id}/`, {
      method: 'DELETE',
      auth: true,
    });
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{ products, loading, error, fetchProducts, addProduct, deleteProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de un ProductsProvider');
  }
  return context;
};
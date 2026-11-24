import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { products as initialProducts } from '../data/products';
import type { Product } from '../data/products';

interface ProductsContextType {
  products: Product[];
  addProduct: (newProduct: Omit<Product, 'id'>) => void;
  deleteProduct: (id: number) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const nextId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    const productWithId: Product = {
      id: nextId,
      ...newProduct,
    };

    setProducts((prev) => [productWithId, ...prev]);
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, deleteProduct }}>
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
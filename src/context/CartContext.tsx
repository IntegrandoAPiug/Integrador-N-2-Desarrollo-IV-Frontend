import { useState, createContext } from "react";
import type { Product } from "../data/products";

interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getItemQuantity: () => number;
  getItemSubtotal: (productId: number) => number;
  getTotalCart: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const isInCart = (id: number): boolean =>
    items.some((p) => p.id === id);

  const addToCart = (product: Product, quantity: number): void => {
    if (quantity > product.stock) {
      console.warn("No hay stock suficiente");
      return;
    }

    const index = items.findIndex((p) => p.id === product.id);

    if (isInCart(product.id)) {
      const aux = [...items];
      aux[index] = {
        ...aux[index],
        quantity,
      };
      setItems(aux);
    } else {
      setItems((prev) => [...prev, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId: number): void => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCart = (): void => {
    setItems([]);
  };

  const getItemQuantity = (): number => {
    return items.reduce((acc, p) => acc + p.quantity, 0);
  };

  const getItemSubtotal = (productId: number): number => {
    const item = items.find((p) => p.id === productId);
    return item ? item.precio * item.quantity : 0;
  };

  const getTotalCart = (): number => {
    return items.reduce((acc, p) => acc + p.precio * p.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        getItemQuantity,
        getItemSubtotal,
        getTotalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
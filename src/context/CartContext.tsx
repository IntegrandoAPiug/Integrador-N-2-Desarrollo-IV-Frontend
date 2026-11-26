import { useState, createContext, useEffect } from "react";
import type { Product } from "../data/products";
import { apiFetch } from "../services/api";
import { useAuth } from "./AuthContext";

export interface CartItem extends Product {
  quantity: number;
  itemId?: number; // ID del ItemCarrito en la base de datos
}

export interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  checkout: () => Promise<any>;
  getPedidos: () => Promise<any[]>;
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
  const [loading, setLoading] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();

  // Sincroniza el carrito desde Django cuando el usuario está autenticado
  const fetchCart = async () => {
    if (!isAuthenticated) {
      setItems([]);
      return;
    }
    try {
      setLoading(true);
      const data = await apiFetch<any>("/carrito/", { auth: true });
      const rawItems = data.items || [];
      const mappedItems: CartItem[] = rawItems.map((item: any) => {
        const prod = item.producto_detalle || item.producto || {};
        return {
          id: typeof item.producto === "number" ? item.producto : prod.id,
          itemId: item.id,
          nombre: prod.nombre || item.nombre || "Producto",
          descripcion: prod.descripcion || "",
          img: prod.img || "",
          precio: Number(prod.precio ?? item.precio_unitario ?? 0),
          stock: Number(prod.stock ?? 99),
          categoria: prod.categoria || "",
          quantity: Number(item.cantidad),
        };
      });
      setItems(mappedItems);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const addToCart = async (product: Product, quantity: number): Promise<void> => {
    if (quantity > product.stock) {
      alert("No hay stock suficiente");
      return;
    }

    if (!isAuthenticated) {
      alert("Debés iniciar sesión para agregar productos al carrito.");
      return;
    }

    try {
      const existing = items.find((p) => p.id === product.id);
      if (existing && existing.itemId) {
        await apiFetch(`/carrito/items/${existing.itemId}/`, {
          method: "PATCH",
          auth: true,
          body: JSON.stringify({ cantidad: quantity }),
        });
      } else {
        await apiFetch("/carrito/items/", {
          method: "POST",
          auth: true,
          body: JSON.stringify({ producto: product.id, cantidad: quantity }),
        });
      }
      await fetchCart();
    } catch (error: any) {
      alert(error.message || "No se pudo actualizar el carrito");
    }
  };

  const removeFromCart = async (productId: number): Promise<void> => {
    const existing = items.find((p) => p.id === productId);
    if (!existing) return;

    if (isAuthenticated && existing.itemId) {
      await apiFetch(`/carrito/items/${existing.itemId}/`, {
        method: "DELETE",
        auth: true,
      });
      await fetchCart();
    } else {
      setItems((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const clearCart = async (): Promise<void> => {
    if (isAuthenticated) {
      await apiFetch("/carrito/", {
        method: "DELETE",
        auth: true,
      });
    }
    setItems([]);
  };

  const checkout = async (): Promise<any> => {
    const pedido = await apiFetch("/pedidos/checkout/", {
      method: "POST",
      auth: true,
    });
    await fetchCart();
    return pedido;
  };

  const getPedidos = async (): Promise<any[]> => {
    const data = await apiFetch<any>("/pedidos/", { auth: true });
    return Array.isArray(data) ? data : data.results || [];
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
        loading,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        getPedidos,
        getItemQuantity,
        getItemSubtotal,
        getTotalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
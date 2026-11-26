import type { JSX } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './components/Home.tsx';
import Cart from './components/Cart.tsx';
import Contact from './components/Contact';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Productos from './components/Productos.tsx';
import Login from './components/Login.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { ProductsProvider } from './context/ProductsContext.tsx';
import { MessagesProvider } from './context/MessagesContext.tsx';
import { CartProvider } from './context/CartContext.tsx';
import './App.css';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <ProductsProvider>
        <MessagesProvider>
          <CartProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer />
            </BrowserRouter>
          </CartProvider>
        </MessagesProvider>
      </ProductsProvider>
    </AuthProvider>
  );
};

export default App;
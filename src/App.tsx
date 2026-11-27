import { useEffect, type JSX } from 'react';
import { Routes, Route, BrowserRouter, Navigate, useLocation } from 'react-router-dom';
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

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/productos" replace />;
  return children;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <AuthProvider>
      <ProductsProvider>
        <MessagesProvider>
          <CartProvider>
            <BrowserRouter>
              <ScrollToTop />
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
                    <AdminRoute>
                      <AdminPanel />
                    </AdminRoute>
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
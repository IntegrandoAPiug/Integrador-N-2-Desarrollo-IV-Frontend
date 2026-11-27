import { useState, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import { useProducts } from "../context/ProductsContext";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchProducts } = useProducts();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const query = searchTerm.trim();
    fetchProducts(query ? `?search=${encodeURIComponent(query)}` : "");
    navigate("/productos");
  };

  const handleUserAction = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header className="main-header">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <NavLink
              className="navbar-brand logo"
              to="/"
              onClick={() => {
                setSearchTerm("");
                fetchProducts();
              }}
            >
              <img src={logo} alt="Logo pastelería" className="header-logo" />
            </NavLink>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarMenu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarMenu">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/productos"
                    onClick={() => {
                      setSearchTerm("");
                      fetchProducts();
                    }}
                  >
                    Productos
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">
                    Contacto
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/cart">
                    Carrito
                  </NavLink>
                </li>
              </ul>

              <form className="d-flex align-items-center" onSubmit={handleSearch}>
                <input
                  className="form-control search-box"
                  type="search"
                  placeholder="Buscar postres..."
                  value={searchTerm}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchTerm(val);
                    if (val === "") {
                      fetchProducts();
                    }
                  }}
                />

                <button type="submit" className="btn search-btn">
                  Buscar
                </button>

                <button
                  type="button"
                  onClick={handleUserAction}
                  title={isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
                  aria-label={isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.4)",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "10px",
                    color: "#fff",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  {isAuthenticated ? (
                    /* Ícono de cerrar sesión (Logout) */
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                  ) : (
                    /* Ícono de usuario (Login) */
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>

      <svg
        className="chocolate-wave"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill="#5B3725"
          d="
          M0,0
          H1440
          V45
          C1380,80 1320,15 1260,45
          C1200,80 1140,15 1080,45
          C1020,80 960,15 900,45
          C840,80 780,15 720,45
          C660,80 600,15 540,45
          C480,80 420,15 360,45
          C300,80 240,15 180,45
          C120,80 60,15 0,45
          Z"
        />
      </svg>
    </>
  );
};

export default Header;
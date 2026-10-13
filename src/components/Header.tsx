import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <>
      <header className="main-header">

        <nav className="navbar navbar-expand-lg">

          <div className="container">

            <NavLink className="navbar-brand logo" to="/">
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
                  <NavLink className="nav-link" to="/productos">
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

              <form className="d-flex">

                <input
                  className="form-control search-box"
                  type="search"
                  placeholder="Buscar postres..."
                />

                <button className="btn search-btn">
                  Buscar
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
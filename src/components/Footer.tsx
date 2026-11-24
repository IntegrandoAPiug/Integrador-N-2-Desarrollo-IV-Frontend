import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import iconInstagram from '../assets/instagram.png'
import iconFacebook from '../assets/facebook.png'
import logo from '../assets/logo.png'
import iconDireccion from '../assets/direccion.png'
import iconEmail from '../assets/email.png'
import iconTelefono from '../assets/telefono.png'
import iconHorario from '../assets/horario.png'

const Footer = () => {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="Logo" className="footer-logo-img" />
          </div>
          <p className="footer-description">
            Pastelería artesanal creando momentos dulces e inolvidables para vos y tu familia.
          </p>
          <div className="footer-social">
            <a href="#" className="footer-social-btn" aria-label="Instagram"> <img src={iconInstagram} alt="Instagram" /> </a>
            <a href="#" className="footer-social-btn" aria-label="Facebook"> <img src={iconFacebook} alt="Facebook" /> </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Navegación</h4>
          <ul className="footer-links">
            <li><NavLink to="/" className="footer-link">Inicio</NavLink></li>
            <li><NavLink to="/cart" className="footer-link">Carrito</NavLink></li>
            <li><NavLink to="/contact" className="footer-link">Contacto</NavLink></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Información de Contacto</h4>
          <ul className="footer-contact-list">
            <li className="footer-contact-item">
              <div className="footer-contact-icon">
                <img src={iconDireccion} alt="Dirección" />
              </div>
              <span>Hipólito Yrigoyen 1234, Trelew - Chubut</span>
            </li>
            <li className="footer-contact-item">
              <div className="footer-contact-icon">
                <img src={iconEmail} alt="Email" />
              </div>
              <span>capitalcake@gmail.com</span>
            </li>
            <li className="footer-contact-item">
              <div className="footer-contact-icon">
                <img src={iconTelefono} alt="Teléfono" />
              </div>
              <span>+54 9 280 000-0000</span>
            </li>
            <li className="footer-contact-item">
              <div className="footer-contact-icon">
                <img src={iconHorario} alt="Horario" />
              </div>
              <span>Lun–Sáb: 8:00 - 20:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Pastelería. Todos los derechos reservados.</p>
        <p>Hecho con amor y harina</p>

        <NavLink
          to={isAuthenticated ? "/admin" : "/login"}
          className="footer-admin-btn"
          title={isAuthenticated ? "Ir al Panel de Administración" : "Acceso Administrador"}
        >
          {isAuthenticated ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
              </svg>
              <span>Panel</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Admin</span>
            </>
          )}
        </NavLink>
      </div>
    </footer>
  )
}

export default Footer
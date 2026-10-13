import { NavLink } from 'react-router-dom'
import iconInstagram from '../assets/instagram.png'
import iconFacebook from '../assets/facebook.png'
import logo from '../assets/logo.png'
import iconDireccion from '../assets/direccion.png'
import iconEmail from '../assets/email.png'
import iconTelefono from '../assets/telefono.png'
import iconHorario from '../assets/horario.png'

const Footer = () => {
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
      </div>
    </footer>
  )
}

export default Footer
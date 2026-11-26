import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    if (isRegister) {
      const res = await register({ username, email, password });
      setLoading(false);
      if (res.ok) {
        setSuccessMsg('¡Cuenta creada con éxito! Ahora podés iniciar sesión.');
        setIsRegister(false);
        setPassword('');
      } else {
        setError(res.error || 'No se pudo registrar el usuario.');
      }
    } else {
      const success = await login(username, password);
      setLoading(false);

      if (success) {
        navigate(username.toLowerCase() === 'admin' ? '/admin' : '/productos');
      } else {
        setError('Usuario o contraseña incorrectos. Intentá de nuevo.');
      }
    }
  };

  return (
    <section className="login-section">
      <div className="login-card">
        <div className="login-header">
          <span className="contact-badge">
            {isRegister ? 'Nuevo Cliente' : 'Acceso Usuarios'}
          </span>
          <h2>{isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>
          <p>
            {isRegister
              ? 'Registrate para armar tu carrito y realizar pedidos'
              : 'Ingresá tus credenciales en Capital Cake'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="login-error">{error}</p>}
          {successMsg && (
            <p style={{ color: '#2e7d32', textAlign: 'center', fontWeight: 500 }}>
              {successMsg}
            </p>
          )}

          <div className="login-group">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input
              id="username"
              type="text"
              className="login-input"
              placeholder="Ej: juanperez"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {isRegister && (
            <div className="login-group">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                id="email"
                type="email"
                className="login-input"
                placeholder="Ej: juan@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          <div className="login-group">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              id="password"
              type="password"
              className="login-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading
              ? 'Procesando...'
              : isRegister
              ? 'Registrarme'
              : 'Iniciar Sesión'}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
              setSuccessMsg('');
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8b4513',
              marginTop: '12px',
              cursor: 'pointer',
              textDecoration: 'underline',
              width: '100%',
            }}
          >
            {isRegister
              ? '¿Ya tenés cuenta? Iniciá sesión'
              : '¿No tenés cuenta? Registrate acá'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

interface RequestOptions extends RequestInit {
  auth?: boolean;
}

export async function apiFetch<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { auth = false, headers = {}, ...rest } = options;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  };

  if (auth) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  let response = await fetch(`${API_URL}${endpoint}`, {
    ...rest,
    headers: requestHeaders,
  });

  if (response.status === 401 && auth) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const refreshRes = await fetch(`${API_URL}/auth/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (refreshRes.ok) {
        const data = await refreshRes.json();
        localStorage.setItem('accessToken', data.access);
        requestHeaders['Authorization'] = `Bearer ${data.access}`;
        response = await fetch(`${API_URL}${endpoint}`, {
          ...rest,
          headers: requestHeaders,
        });
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const detalles = errorData?.error?.detalles;
    let detalleTexto = '';

    if (detalles && typeof detalles === 'object') {
      detalleTexto = Object.entries(detalles)
        .map(([campo, msgs]) => `${campo}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
        .join(' | ');
    }

    const mensaje =
      detalleTexto ||
      errorData?.error?.mensaje ||
      errorData?.detail ||
      'Error en la comunicación con el servidor';
    throw new Error(mensaje);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
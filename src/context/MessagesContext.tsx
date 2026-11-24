import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface ContactMessage {
  id: number;
  nombre: string;
  email: string;
  mensaje: string;
  fecha: string;
  leido: boolean;
}

interface MessagesContextType {
  messages: ContactMessage[];
  addMessage: (msg: Omit<ContactMessage, 'id' | 'fecha' | 'leido'>) => void;
  toggleReadMessage: (id: number) => void;
  deleteMessage: (id: number) => void;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

const initialMessages: ContactMessage[] = [
  {
    id: 1,
    nombre: 'Camila Gómez',
    email: 'camila.gomez@ejemplo.com',
    mensaje: 'Hola! Quería consultar si hacen torta de chocolate y frutos rojos para 20 personas para el sábado.',
    fecha: 'Hoy · 15:40',
    leido: false,
  },
  {
    id: 2,
    nombre: 'Lucas Fernández',
    email: 'lucas.f@ejemplo.com',
    mensaje: 'Buenas tardes, ¿tienen disponibilidad de dos cajas de alfajores de maicena para retirar mañana?',
    fecha: 'Ayer · 18:10',
    leido: true,
  },
];

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);

  const addMessage = (msg: Omit<ContactMessage, 'id' | 'fecha' | 'leido'>) => {
    const nextId =
      messages.length > 0 ? Math.max(...messages.map((m) => m.id)) + 1 : 1;

    const newMsg: ContactMessage = {
      id: nextId,
      ...msg,
      fecha: 'Recién enviado',
      leido: false,
    };

    setMessages((prev) => [newMsg, ...prev]);

    fetch('http://127.0.0.1:8000/api/contacto/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg),
    }).catch((err) => console.error('Error al enviar mensaje:', err));
    
  };

  const toggleReadMessage = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, leido: !msg.leido } : msg))
    );
  };

  const deleteMessage = (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <MessagesContext.Provider
      value={{ messages, addMessage, toggleReadMessage, deleteMessage }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages debe usarse dentro de un MessagesProvider');
  }
  return context;
};
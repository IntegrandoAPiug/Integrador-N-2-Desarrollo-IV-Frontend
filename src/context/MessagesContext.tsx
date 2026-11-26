import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { apiFetch } from '../services/api';

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
  addMessage: (msg: Omit<ContactMessage, 'id' | 'fecha' | 'leido'>) => Promise<void>;
  toggleReadMessage: (id: number) => void;
  deleteMessage: (id: number) => void;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const addMessage = async (msg: Omit<ContactMessage, 'id' | 'fecha' | 'leido'>) => {
    const created = await apiFetch<any>('/contacto/', {
      method: 'POST',
      body: JSON.stringify(msg),
    });

    const newMsg: ContactMessage = {
      id: created?.id || Date.now(),
      ...msg,
      fecha: 'Recién enviado',
      leido: false,
    };

    setMessages((prev) => [newMsg, ...prev]);
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
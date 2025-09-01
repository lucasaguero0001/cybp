import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface PasswordResetFormProps {
  onBack: () => void;
}

export const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onBack }) => {
  const { state } = useAppContext();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const user = state.users.find(u => u.email === email);

    if (user) {
      setMessage('Se ha enviado un enlace de recuperación a su correo electrónico');
      setMessageType('success');
    } else {
      setMessage('No se encontró una cuenta asociada con este correo electrónico');
      setMessageType('error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Recuperar Contraseña</h2>
        <p className="text-gray-600">Ingrese su correo electrónico para recibir el enlace de recuperación</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {message && (
          <div className={`border px-4 py-3 rounded-lg ${
            messageType === 'success' 
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Correo Electrónico
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-colors transform hover:scale-105"
        >
          Enviar Enlace
        </button>
      </form>

      <button
        onClick={onBack}
        className="flex items-center justify-center w-full text-pink-600 hover:text-pink-500 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver al inicio de sesión
      </button>
    </div>
  );
};
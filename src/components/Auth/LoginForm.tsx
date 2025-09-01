import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface LoginFormProps {
  onViewChange: (view: string) => void;
  onForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onViewChange, onForgotPassword }) => {
  const { state, dispatch } = useAppContext();
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (state.loginAttempts >= 3) {
      setError('Demasiados intentos fallidos. Intente más tarde.');
      return;
    }

    const user = state.users.find(
      u => (u.email === formData.emailOrUsername || u.username === formData.emailOrUsername) 
        && u.password === formData.password
    );

    if (user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      dispatch({ type: 'RESET_LOGIN_ATTEMPTS' });
      onViewChange('catalog');
    } else {
      dispatch({ type: 'INCREMENT_LOGIN_ATTEMPTS' });
      setError('Credenciales incorrectas. Verifique su email/usuario y contraseña.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email o Usuario
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
            placeholder="Ingrese su email o usuario"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contraseña
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
            placeholder="Ingrese su contraseña"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-pink-600 hover:text-pink-500 transition-colors"
        >
          ¿Olvidó su contraseña?
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-colors transform hover:scale-105"
      >
        Iniciar Sesión
      </button>

      {state.loginAttempts > 0 && (
        <div className="text-sm text-orange-600 text-center">
          Intentos fallidos: {state.loginAttempts}/3
        </div>
      )}
    </form>
  );
};
import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { PasswordResetForm } from './PasswordResetForm';

export type AuthTab = 'login' | 'register' | 'reset';

interface AuthViewProps {
  onViewChange: (view: string) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onViewChange }) => {
  const [currentTab, setCurrentTab] = useState<AuthTab>('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">CyberPétalos</h1>
            <p className="text-gray-600">Tu tienda de flores favorita</p>
          </div>

          {/* Tabs */}
          {currentTab !== 'reset' && (
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setCurrentTab('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  currentTab === 'login'
                    ? 'bg-white text-pink-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setCurrentTab('register')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  currentTab === 'register'
                    ? 'bg-white text-pink-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Registrarse
              </button>
            </div>
          )}

          {/* Forms */}
          {currentTab === 'login' && (
            <LoginForm 
              onViewChange={onViewChange}
              onForgotPassword={() => setCurrentTab('reset')}
            />
          )}
          {currentTab === 'register' && (
            <RegisterForm onViewChange={onViewChange} />
          )}
          {currentTab === 'reset' && (
            <PasswordResetForm onBack={() => setCurrentTab('login')} />
          )}
        </div>
      </div>
    </div>
  );
};
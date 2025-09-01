import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, Flower2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const { state, dispatch } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    onViewChange('catalog');
    setIsMenuOpen(false);
  };

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => onViewChange('catalog')}
          >
            <Flower2 className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
            <h1 className="text-2xl font-bold text-white tracking-wide">
              CyberPétalos
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => onViewChange('catalog')}
              className={`px-4 py-2 rounded-full transition-all ${
                currentView === 'catalog'
                  ? 'bg-white text-pink-500 shadow-md'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Catálogo
            </button>
            <button
              onClick={() => onViewChange('info')}
              className={`px-4 py-2 rounded-full transition-all ${
                currentView === 'info'
                  ? 'bg-white text-pink-500 shadow-md'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Información
            </button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {state.isLoggedIn ? (
              <>
                {/* Cart Button */}
                <button
                  onClick={() => onViewChange('cart')}
                  className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-pink-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={toggleMenu}
                    className="flex items-center space-x-2 text-white hover:bg-white/10 px-3 py-2 rounded-full transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden md:block">{state.currentUser?.username}</span>
                    <Menu className="h-4 w-4 md:hidden" />
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                      <button
                        onClick={() => {
                          onViewChange('profile');
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Mi Perfil
                      </button>
                      {state.currentUser?.role === 'admin' && (
                        <button
                          onClick={() => {
                            onViewChange('admin');
                            setIsMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Panel Admin
                        </button>
                      )}
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => onViewChange('auth')}
                className="bg-white text-pink-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-md"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && !state.isLoggedIn && (
          <nav className="md:hidden mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  onViewChange('catalog');
                  setIsMenuOpen(false);
                }}
                className={`text-left px-4 py-2 rounded ${
                  currentView === 'catalog'
                    ? 'bg-white text-pink-500'
                    : 'text-white hover:bg-white/10'
                } transition-colors`}
              >
                Catálogo
              </button>
              <button
                onClick={() => {
                  onViewChange('info');
                  setIsMenuOpen(false);
                }}
                className={`text-left px-4 py-2 rounded ${
                  currentView === 'info'
                    ? 'bg-white text-pink-500'
                    : 'text-white hover:bg-white/10'
                } transition-colors`}
              >
                Información
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
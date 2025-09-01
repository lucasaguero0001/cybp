import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { AuthView } from './components/Auth/AuthView';
import { CatalogView } from './components/Catalog/CatalogView';
import { CartView } from './components/Cart/CartView';
import { CheckoutView } from './components/Checkout/CheckoutView';
import { ProfileView } from './components/Profile/ProfileView';
import { AdminView } from './components/Admin/AdminView';

type View = 'auth' | 'catalog' | 'cart' | 'checkout' | 'profile' | 'admin';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('catalog');

  const renderView = () => {
    switch (currentView) {
      case 'auth':
        return (
          <div className="min-h-screen">
            <AuthView onViewChange={setCurrentView} />
          </div>
        );
      case 'catalog':
        return (
          <>
            <CatalogView />
            <Footer />
          </>
        );
      case 'cart':
        return (
          <>
            <CartView onViewChange={setCurrentView} />
            <Footer />
          </>
        );
      case 'checkout':
        return (
          <>
            <CheckoutView onViewChange={setCurrentView} />
            <Footer />
          </>
        );
      case 'profile':
        return (
          <>
            <ProfileView />
            <Footer />
          </>
        );
      case 'admin':
        return (
          <>
            <AdminView />
            <Footer />
          </>
        );
      default:
        return (
          <>
            <CatalogView />
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-grow">
        {renderView()}
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
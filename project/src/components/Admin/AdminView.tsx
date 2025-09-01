import React, { useState } from 'react';
import { Users, Package, BarChart3, Settings } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { UserManagement } from './UserManagement';
import { ProductManagement } from './ProductManagement';
import { StockManagement } from './StockManagement';
import { Statistics } from './Statistics';

export const AdminView: React.FC = () => {
  const { state } = useAppContext();
  const [activeTab, setActiveTab] = useState<'users' | 'products' | 'stock' | 'stats'>('users');

  // Only allow admin access
  if (!state.currentUser || state.currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceso Denegado</h2>
          <p className="text-gray-600">No tienes permisos para acceder al panel de administración</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'users', label: 'Usuarios', icon: Users, component: UserManagement },
    { id: 'products', label: 'Productos', icon: Package, component: ProductManagement },
    { id: 'stock', label: 'Stock', icon: Settings, component: StockManagement },
    { id: 'stats', label: 'Estadísticas', icon: BarChart3, component: Statistics },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || UserManagement;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
            <p className="text-gray-600">Gestiona usuarios, productos y configuraciones</p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-wrap border-b border-gray-200">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 min-w-[120px] py-4 px-6 text-center font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5 inline-block mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 lg:p-8">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
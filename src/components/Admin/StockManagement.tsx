import React from 'react';
import { Package, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const StockManagement: React.FC = () => {
  const { state } = useAppContext();

  const getStockStatus = (stock: number, reorderPoint: number) => {
    if (stock === 0) {
      return { 
        icon: AlertTriangle, 
        color: 'text-red-500', 
        bg: 'bg-red-50', 
        border: 'border-red-200',
        text: 'Sin Stock',
        priority: 3
      };
    }
    if (stock <= reorderPoint) {
      return { 
        icon: Clock, 
        color: 'text-orange-500', 
        bg: 'bg-orange-50', 
        border: 'border-orange-200',
        text: 'Stock Bajo',
        priority: 2
      };
    }
    if (stock <= reorderPoint * 1.5) {
      return { 
        icon: Clock, 
        color: 'text-yellow-500', 
        bg: 'bg-yellow-50', 
        border: 'border-yellow-200',
        text: 'Cerca del Punto',
        priority: 1
      };
    }
    return { 
      icon: CheckCircle, 
      color: 'text-green-500', 
      bg: 'bg-green-50', 
      border: 'border-green-200',
      text: 'Disponible',
      priority: 0
    };
  };

  // Sort products by priority (highest priority first)
  const sortedProducts = [...state.products].sort((a, b) => {
    const statusA = getStockStatus(a.stock, a.reorderPoint);
    const statusB = getStockStatus(b.stock, b.reorderPoint);
    return statusB.priority - statusA.priority;
  });

  const stats = {
    total: state.products.length,
    outOfStock: state.products.filter(p => p.stock === 0).length,
    lowStock: state.products.filter(p => p.stock > 0 && p.stock <= p.reorderPoint).length,
    nearReorder: state.products.filter(p => p.stock > p.reorderPoint && p.stock <= p.reorderPoint * 1.5).length,
    available: state.products.filter(p => p.stock > p.reorderPoint * 1.5).length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Control de Stock</h2>
        <div className="text-sm text-gray-600">
          Total: {stats.total} productos
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <p className="text-red-700 font-semibold">Sin Stock</p>
              <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <p className="text-orange-700 font-semibold">Stock Bajo</p>
              <p className="text-2xl font-bold text-orange-600">{stats.lowStock}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-yellow-700 font-semibold">Cerca del Punto</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.nearReorder}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-green-700 font-semibold">Disponibles</p>
              <p className="text-2xl font-bold text-green-600">{stats.available}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Producto</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Categoría</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stock Actual</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Punto de Reposición</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Precio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedProducts.map(product => {
                const status = getStockStatus(product.stock, product.reorderPoint);
                const StatusIcon = status.icon;
                
                return (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg mr-4"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        product.category === 'flores' 
                          ? 'bg-pink-100 text-pink-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        <Package className="h-3 w-3 mr-1" />
                        {product.category === 'flores' ? 'Flores' : 'Floreros'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-gray-900">
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {product.reorderPoint}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-3 py-2 rounded-lg border ${status.bg} ${status.border}`}>
                        <StatusIcon className={`h-4 w-4 mr-2 ${status.color}`} />
                        <span className={`font-medium ${status.color}`}>
                          {status.text}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-4">Recomendaciones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Acción Inmediata</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• {stats.outOfStock} productos sin stock requieren reposición urgente</li>
              <li>• {stats.lowStock} productos tienen stock bajo</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Planificación</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• {stats.nearReorder} productos se acercan al punto de reposición</li>
              <li>• Revisar puntos de reposición según demanda histórica</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
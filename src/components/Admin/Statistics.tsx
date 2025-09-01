import React from 'react';
import { TrendingUp, ShoppingCart, Users, DollarSign, Package, Star } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const Statistics: React.FC = () => {
  const { state } = useAppContext();

  // Calculate statistics
  const totalRevenue = state.purchases.reduce((sum, purchase) => sum + purchase.total, 0);
  const totalOrders = state.purchases.length;
  const totalUsers = state.users.filter(user => user.role === 'client').length;
  const totalProducts = state.products.length;

  // Calculate products sold
  const productsSold = state.purchases.reduce((acc, purchase) => {
    purchase.items.forEach(item => {
      if (acc[item.name]) {
        acc[item.name] += item.quantity;
      } else {
        acc[item.name] = item.quantity;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  const topProducts = Object.entries(productsSold)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Calculate monthly sales (simulate data for last 6 months)
  const currentMonth = new Date().getMonth();
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  
  const monthlySales = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - 5 + i + 12) % 12;
    const monthPurchases = state.purchases.filter(purchase => {
      const purchaseMonth = new Date(purchase.date).getMonth();
      return purchaseMonth === monthIndex;
    });
    
    return {
      month: monthNames[monthIndex],
      sales: monthPurchases.reduce((sum, purchase) => sum + purchase.total, 0),
      orders: monthPurchases.length
    };
  });

  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Estadísticas y Reportes</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Ingresos Totales</p>
              <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
            </div>
            <DollarSign className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Pedidos</p>
              <p className="text-3xl font-bold">{totalOrders}</p>
            </div>
            <ShoppingCart className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Clientes Activos</p>
              <p className="text-3xl font-bold">{totalUsers}</p>
            </div>
            <Users className="h-12 w-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Productos Totales</p>
              <p className="text-3xl font-bold">{totalProducts}</p>
            </div>
            <Package className="h-12 w-12 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Ventas por Mes</h3>
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
          
          <div className="space-y-4">
            {monthlySales.map((data, index) => {
              const maxSales = Math.max(...monthlySales.map(m => m.sales));
              const widthPercentage = maxSales > 0 ? (data.sales / maxSales) * 100 : 0;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{data.month}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">${data.sales.toFixed(2)}</span>
                      <span className="text-xs text-gray-500 ml-2">({data.orders} pedidos)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${widthPercentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Productos Más Vendidos</h3>
            <Star className="h-6 w-6 text-yellow-500" />
          </div>

          {topProducts.length > 0 ? (
            <div className="space-y-4">
              {topProducts.map(([productName, quantity], index) => {
                const maxQuantity = Math.max(...topProducts.map(([,q]) => q));
                const widthPercentage = (quantity / maxQuantity) * 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 line-clamp-1">
                        #{index + 1} {productName}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {quantity} vendidos
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${widthPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No hay datos de ventas aún</p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Valor Promedio de Pedido</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">${averageOrderValue.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">Por pedido</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Productos en Stock</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Disponibles</span>
              <span className="font-semibold text-green-600">
                {state.products.filter(p => p.stock > p.reorderPoint).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Stock Bajo</span>
              <span className="font-semibold text-orange-600">
                {state.products.filter(p => p.stock <= p.reorderPoint && p.stock > 0).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Sin Stock</span>
              <span className="font-semibold text-red-600">
                {state.products.filter(p => p.stock === 0).length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Categorías</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Flores</span>
              <span className="font-semibold text-pink-600">
                {state.products.filter(p => p.category === 'flores').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Floreros</span>
              <span className="font-semibold text-purple-600">
                {state.products.filter(p => p.category === 'floreros').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-indigo-900 mb-4">Insights de Rendimiento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-indigo-800 mb-2">Tendencias Positivas</h4>
            <ul className="text-indigo-700 text-sm space-y-1">
              <li>• {totalUsers} clientes registrados activos</li>
              <li>• ${averageOrderValue.toFixed(2)} valor promedio por pedido</li>
              <li>• {state.products.filter(p => p.stock > 0).length} productos disponibles</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-800 mb-2">Áreas de Mejora</h4>
            <ul className="text-indigo-700 text-sm space-y-1">
              <li>• Reponer {state.products.filter(p => p.stock === 0).length} productos sin stock</li>
              <li>• Optimizar productos con stock bajo</li>
              <li>• Expandir productos de categorías populares</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
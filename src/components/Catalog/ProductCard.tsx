import React from 'react';
import { ShoppingCart, Eye, AlertCircle } from 'lucide-react';
import { useAppContext, Product } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetail }) => {
  const { state, dispatch } = useAppContext();

  const getStockStatus = () => {
    if (product.stock === 0) return { color: 'text-red-500', text: 'Sin stock' };
    if (product.stock <= product.reorderPoint) return { color: 'text-orange-500', text: 'Stock bajo' };
    return { color: 'text-green-500', text: 'Disponible' };
  };

  const handleAddToCart = () => {
    if (!state.isLoggedIn) {
      alert('Debe iniciar sesión para agregar productos al carrito');
      return;
    }

    if (product.stock === 0) {
      alert('Este producto no tiene stock disponible');
      return;
    }

    // Check if product is already in cart and if adding one more would exceed stock
    const cartItem = state.cart.find(item => item.productId === product.id);
    const currentCartQuantity = cartItem ? cartItem.quantity : 0;

    if (currentCartQuantity >= product.stock) {
      alert('No hay suficiente stock disponible para este producto');
      return;
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId: product.id, quantity: 1 }
    });

    // Show success message
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform';
    toast.textContent = 'Producto agregado al carrito';
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.remove('translate-x-full'), 100);
    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  };

  const stockStatus = getStockStatus();

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.category === 'flores' 
              ? 'bg-pink-100 text-pink-800' 
              : 'bg-purple-100 text-purple-800'
          }`}>
            {product.category === 'flores' ? 'Flores' : 'Floreros'}
          </span>
        </div>
        {product.stock <= product.reorderPoint && product.stock > 0 && (
          <div className="absolute top-4 left-4">
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              Stock Bajo
            </span>
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
              Sin Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-pink-600">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="text-right">
            <p className={`text-sm font-medium ${stockStatus.color}`}>
              {stockStatus.text}
            </p>
            <p className="text-xs text-gray-500">
              Stock: {product.stock}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetail(product)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <Eye className="h-4 w-4 mr-2" />
            Ver Detalles
          </button>
          
          {state.isLoggedIn && (
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
                product.stock === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transform hover:scale-105'
              }`}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Agregar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface CartViewProps {
  onViewChange: (view: string) => void;
}

export const CartView: React.FC<CartViewProps> = ({ onViewChange }) => {
  const { state, dispatch } = useAppContext();

  const cartItems = state.cart.map(cartItem => {
    const product = state.products.find(p => p.id === cartItem.productId);
    return {
      ...cartItem,
      product: product!
    };
  }).filter(item => item.product);

  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    if (newQuantity <= 0) return;
    if (newQuantity > product.stock) {
      alert('No hay suficiente stock disponible para este producto');
      return;
    }

    dispatch({
      type: 'UPDATE_CART_ITEM',
      payload: { productId, quantity: newQuantity }
    });
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    if (window.confirm(`¿Deseas eliminar ${productName} del carrito?`)) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    }
  };

  const handleClearCart = () => {
    if (window.confirm('¿Deseas eliminar todos los productos del carrito?')) {
      dispatch({ type: 'CLEAR_CART' });
    }
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    // Validate stock before proceeding
    const stockError = cartItems.find(item => {
      return item.quantity > item.product.stock;
    });

    if (stockError) {
      alert(`No hay suficiente stock disponible para ${stockError.product.name}`);
      return;
    }

    onViewChange('checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-8">Agrega algunos productos para continuar</p>
          <button
            onClick={() => onViewChange('catalog')}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-colors transform hover:scale-105"
          >
            Ver Catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Carrito</h1>
            <p className="text-gray-600">Revisa tus productos seleccionados</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
            {/* Cart Items */}
            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item.productId} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full lg:w-24 h-24 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {item.product.category === 'flores' ? 'Flores' : 'Floreros'}
                      </p>
                      <p className="text-pink-600 font-bold">
                        ${item.product.price.toFixed(2)} c/u
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        
                        <span className="px-4 py-2 border-x border-gray-300 min-w-[50px] text-center font-semibold">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Stock: {item.product.stock}
                        </p>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.productId, item.product.name)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar del carrito"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t border-gray-200 mt-8 pt-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                  <p className="text-gray-600">
                    Total de productos: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </p>
                  <button
                    onClick={handleClearCart}
                    className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                  >
                    Vaciar carrito
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 mb-4">
                    Total: ${total.toFixed(2)}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => onViewChange('catalog')}
                      className="px-6 py-3 border border-pink-500 text-pink-500 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
                    >
                      Continuar Comprando
                    </button>
                    <button
                      onClick={handleProceedToCheckout}
                      className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-colors transform hover:scale-105 flex items-center"
                    >
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Proceder al Pago
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
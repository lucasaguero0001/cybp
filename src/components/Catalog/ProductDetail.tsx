import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Minus, Plus, AlertCircle, Package } from 'lucide-react';
import { useAppContext, Product } from '../../context/AppContext';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const { state, dispatch } = useAppContext();
  const [quantity, setQuantity] = useState(1);

  const cartItem = state.cart.find(item => item.productId === product.id);
  const currentCartQuantity = cartItem ? cartItem.quantity : 0;
  const maxQuantity = product.stock - currentCartQuantity;

  const getStockStatus = () => {
    if (product.stock === 0) return { color: 'text-red-500', bg: 'bg-red-50', text: 'Sin stock' };
    if (product.stock <= product.reorderPoint) return { color: 'text-orange-500', bg: 'bg-orange-50', text: 'Stock bajo' };
    return { color: 'text-green-500', bg: 'bg-green-50', text: 'Disponible' };
  };

  const handleAddToCart = () => {
    if (!state.isLoggedIn) {
      alert('Debe iniciar sesión para agregar productos al carrito');
      return;
    }

    if (quantity > maxQuantity) {
      alert('No hay suficiente stock disponible para este producto');
      return;
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId: product.id, quantity }
    });

    // Show success message
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform';
    toast.textContent = `${quantity} producto(s) agregado(s) al carrito`;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.remove('translate-x-full'), 100);
    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);

    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const stockStatus = getStockStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-pink-600 hover:text-pink-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver al catálogo
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 lg:h-full object-cover"
              />
              <div className="absolute top-6 right-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.category === 'flores' 
                    ? 'bg-pink-100 text-pink-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {product.category === 'flores' ? 'Flores' : 'Floreros'}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 lg:p-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="mb-6">
                <span className="text-4xl font-bold text-pink-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Stock Status */}
              <div className={`inline-flex items-center px-4 py-2 rounded-lg mb-6 ${stockStatus.bg}`}>
                <Package className={`h-5 w-5 mr-2 ${stockStatus.color}`} />
                <span className={`font-medium ${stockStatus.color}`}>
                  {stockStatus.text} - {product.stock} unidades
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              {state.isLoggedIn && product.stock > 0 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Cantidad
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      
                      <span className="text-xl font-semibold px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
                        {quantity}
                      </span>
                      
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= maxQuantity}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      
                      <span className="text-sm text-gray-500 ml-4">
                        Máximo disponible: {maxQuantity}
                      </span>
                    </div>
                  </div>

                  {maxQuantity > 0 ? (
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 px-6 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-colors transform hover:scale-105 flex items-center justify-center"
                    >
                      <ShoppingCart className="h-5 w-5 mr-3" />
                      Agregar al Carrito - ${(product.price * quantity).toFixed(2)}
                    </button>
                  ) : (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-center text-orange-700">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <span className="font-medium">
                          Ya tienes todo el stock disponible en tu carrito
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!state.isLoggedIn && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-700">
                    <strong>Inicie sesión</strong> para agregar productos al carrito
                  </p>
                </div>
              )}

              {product.stock === 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center text-red-700">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">
                      Producto sin stock. No se puede agregar al carrito.
                    </span>
                  </div>
                </div>
              )}

              {/* Policies */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Información Importante
                </h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Devoluciones aceptadas dentro de 7 días</li>
                  <li>• Flores frescas garantizadas por 5 días</li>
                  <li>• Floreros con garantía de 30 días</li>
                  <li>• Envío gratuito en compras mayores a $50</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, Building2, CheckCircle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface CheckoutViewProps {
  onViewChange: (view: string) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ onViewChange }) => {
  const { state, dispatch } = useAppContext();
  const [step, setStep] = useState<'address' | 'payment' | 'confirm' | 'success'>('address');
  const [formData, setFormData] = useState({
    address: '',
    paymentMethod: 'credit',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [orderId, setOrderId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const cartItems = state.cart.map(cartItem => {
    const product = state.products.find(p => p.id === cartItem.productId);
    return {
      ...cartItem,
      product: product!
    };
  }).filter(item => item.product);

  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleBack = () => {
    if (step === 'address') {
      if (window.confirm('¿Desea cancelar la compra y volver al carrito?')) {
        onViewChange('cart');
      }
    } else if (step === 'payment') {
      setStep('address');
    } else if (step === 'confirm') {
      setStep('payment');
    }
  };

  const validateAddress = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.address.trim()) {
      newErrors.address = 'La dirección de envío es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors: Record<string, string> = {};

    if (formData.paymentMethod === 'credit') {
      if (!formData.cardName.trim()) {
        newErrors.cardName = 'El nombre en la tarjeta es obligatorio';
      }
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'El número de tarjeta es obligatorio';
      } else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'El número de tarjeta debe tener 16 dígitos';
      }
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'La fecha de vencimiento es obligatoria';
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'El CVV es obligatorio';
      } else if (formData.cvv.length !== 3) {
        newErrors.cvv = 'El CVV debe tener 3 dígitos';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (step === 'address') {
      if (validateAddress()) {
        setStep('payment');
      }
    } else if (step === 'payment') {
      if (validatePayment()) {
        setStep('confirm');
      }
    }
  };

  const handleConfirmPurchase = () => {
    // Validate stock one more time
    const stockError = cartItems.find(item => {
      return item.quantity > item.product.stock;
    });

    if (stockError) {
      alert(`No hay suficiente stock disponible para ${stockError.product.name}`);
      return;
    }

    // Simulate payment processing
    const isPaymentAccepted = Math.random() > 0.1; // 90% success rate

    if (!isPaymentAccepted && formData.paymentMethod === 'credit') {
      alert('Pago rechazado, inténtelo nuevamente');
      return;
    }

    // Create purchase
    const purchaseId = `ORD-${Date.now()}`;
    const purchase = {
      id: purchaseId,
      userId: state.currentUser!.id,
      items: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
        name: item.product.name,
      })),
      total,
      paymentMethod: formData.paymentMethod,
      address: formData.address,
      date: new Date().toISOString(),
      status: 'completed' as const,
    };

    dispatch({ type: 'COMPLETE_PURCHASE', payload: purchase });
    setOrderId(purchaseId);
    setStep('success');
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      setFormData({
        ...formData,
        [name]: formatCardNumber(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              ¡Gracias por tu compra!
            </h1>
            <p className="text-gray-600 mb-6">
              Tu pedido ha sido procesado exitosamente
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Número de pedido:</p>
              <p className="font-bold text-lg text-gray-900">{orderId}</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => onViewChange('profile')}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-colors"
              >
                Ver Historial de Compras
              </button>
              <button
                onClick={() => onViewChange('catalog')}
                className="w-full border border-pink-500 text-pink-500 py-3 px-6 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center text-pink-600 hover:text-pink-700 mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {step === 'address' ? 'Volver al carrito' : 'Anterior'}
          </button>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 md:space-x-8">
              <div className={`flex items-center ${step === 'address' ? 'text-pink-600' : step === 'payment' || step === 'confirm' ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step === 'address' ? 'bg-pink-600 text-white' : step === 'payment' || step === 'confirm' ? 'bg-green-600 text-white' : 'bg-gray-200'
                }`}>
                  1
                </div>
                <span className="ml-2 font-medium">Dirección</span>
              </div>
              <div className={`w-8 h-0.5 ${step === 'payment' || step === 'confirm' ? 'bg-green-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center ${step === 'payment' ? 'text-pink-600' : step === 'confirm' ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step === 'payment' ? 'bg-pink-600 text-white' : step === 'confirm' ? 'bg-green-600 text-white' : 'bg-gray-200'
                }`}>
                  2
                </div>
                <span className="ml-2 font-medium">Pago</span>
              </div>
              <div className={`w-8 h-0.5 ${step === 'confirm' ? 'bg-green-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center ${step === 'confirm' ? 'text-pink-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step === 'confirm' ? 'bg-pink-600 text-white' : 'bg-gray-200'
                }`}>
                  3
                </div>
                <span className="ml-2 font-medium">Confirmar</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
                {/* Address Step */}
                {step === 'address' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Dirección de Envío
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dirección Completa *
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={3}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                            errors.address ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Ingrese su dirección completa incluyendo ciudad, código postal..."
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Step */}
                {step === 'payment' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Método de Pago
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Seleccione método de pago
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                            formData.paymentMethod === 'credit' ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="credit"
                              checked={formData.paymentMethod === 'credit'}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className="flex flex-col items-center text-center">
                              <CreditCard className="h-8 w-8 mb-2 text-pink-600" />
                              <span className="font-medium">Tarjeta de Crédito/Débito</span>
                            </div>
                          </label>

                          <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                            formData.paymentMethod === 'transfer' ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="transfer"
                              checked={formData.paymentMethod === 'transfer'}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className="flex flex-col items-center text-center">
                              <Building2 className="h-8 w-8 mb-2 text-pink-600" />
                              <span className="font-medium">Transferencia</span>
                            </div>
                          </label>

                          <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                            formData.paymentMethod === 'delivery' ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="delivery"
                              checked={formData.paymentMethod === 'delivery'}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className="flex flex-col items-center text-center">
                              <Truck className="h-8 w-8 mb-2 text-pink-600" />
                              <span className="font-medium">Contra Entrega</span>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Credit Card Fields */}
                      {formData.paymentMethod === 'credit' && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nombre completo *
                            </label>
                            <input
                              type="text"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                                errors.cardName ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="Nombre como aparece en la tarjeta"
                            />
                            {errors.cardName && (
                              <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Número de tarjeta *
                            </label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              maxLength={19}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                                errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="1234 5678 9012 3456"
                            />
                            {errors.cardNumber && (
                              <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Fecha de vencimiento *
                              </label>
                              <input
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                placeholder="MM/AA"
                                maxLength={5}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                                  errors.expiryDate ? 'border-red-300' : 'border-gray-300'
                                }`}
                              />
                              {errors.expiryDate && (
                                <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                CVV *
                              </label>
                              <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                maxLength={3}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                                  errors.cvv ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="123"
                              />
                              {errors.cvv && (
                                <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Transfer Info */}
                      {formData.paymentMethod === 'transfer' && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Datos para Transferencia</h4>
                          <p className="text-blue-800"><strong>CBU:</strong> 1234567890123456789012</p>
                          <p className="text-blue-800"><strong>Titular:</strong> CyberPétalos S.A.</p>
                          <p className="text-blue-800 text-sm mt-2">
                            Envíe el comprobante por email después de realizar la transferencia.
                          </p>
                        </div>
                      )}

                      {/* Delivery Info */}
                      {formData.paymentMethod === 'delivery' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-900 mb-2">Pago Contra Entrega</h4>
                          <p className="text-green-800">
                            Podrá pagar en efectivo al recibir su pedido. 
                            Asegúrese de tener el monto exacto.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Confirmation Step */}
                {step === 'confirm' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Confirmar Compra
                    </h2>
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Dirección de envío:</h4>
                        <p className="text-gray-700">{formData.address}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Método de pago:</h4>
                        <p className="text-gray-700">
                          {formData.paymentMethod === 'credit' && 'Tarjeta de Crédito/Débito'}
                          {formData.paymentMethod === 'transfer' && 'Transferencia Bancaria'}
                          {formData.paymentMethod === 'delivery' && 'Contra Entrega'}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Productos:</h4>
                        <div className="space-y-2">
                          {cartItems.map(item => (
                            <div key={item.productId} className="flex justify-between items-center">
                              <span className="text-gray-700">
                                {item.product.name} x {item.quantity}
                              </span>
                              <span className="font-semibold">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex justify-end">
                  {step !== 'confirm' ? (
                    <button
                      onClick={handleContinue}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-colors transform hover:scale-105"
                    >
                      Continuar
                    </button>
                  ) : (
                    <button
                      onClick={handleConfirmPurchase}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-colors transform hover:scale-105"
                    >
                      Confirmar Compra
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen del Pedido</h3>
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.product.name} x {item.quantity}
                      </span>
                      <span className="font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-pink-600">
                      ${total.toFixed(2)}
                    </span>
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
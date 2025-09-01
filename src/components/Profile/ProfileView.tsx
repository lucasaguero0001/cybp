import React, { useState } from 'react';
import { User, ShoppingBag, Edit3, Calendar, DollarSign, Package } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const ProfileView: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: state.currentUser?.username || '',
    email: state.currentUser?.email || '',
    address: state.currentUser?.address || '',
    cardNumber: state.currentUser?.bankData?.cardNumber || '',
    cardName: state.currentUser?.bankData?.cardName || '',
    expiryDate: state.currentUser?.bankData?.expiryDate || '',
    cvv: state.currentUser?.bankData?.cvv || '',
  });
  const [message, setMessage] = useState('');

  if (!state.currentUser) {
    return <div>No hay usuario logueado</div>;
  }

  const handleSaveChanges = () => {
    setMessage('');

    if (!formData.username.trim() || !formData.email.trim()) {
      setMessage('Nombre de usuario y email son obligatorios');
      return;
    }

    const updateData = {
      username: formData.username,
      email: formData.email,
      address: formData.address,
      bankData: {
        cardNumber: formData.cardNumber,
        cardName: formData.cardName,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
      }
    };

    dispatch({
      type: 'UPDATE_USER',
      payload: { userId: state.currentUser.id, data: updateData }
    });

    setIsEditing(false);
    setMessage('Datos actualizados correctamente');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalSpent = state.currentUser.purchaseHistory.reduce((sum, purchase) => sum + purchase.total, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
            <p className="text-gray-600">Gestiona tu información personal y revisa tu historial</p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <User className="h-5 w-5 inline-block mr-2" />
                Datos Personales
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  activeTab === 'history'
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <ShoppingBag className="h-5 w-5 inline-block mr-2" />
                Historial de Compras
              </button>
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Información Personal</h2>
                  <button
                    onClick={() => {
                      if (isEditing) {
                        setIsEditing(false);
                        setFormData({
                          username: state.currentUser?.username || '',
                          email: state.currentUser?.email || '',
                          address: state.currentUser?.address || '',
                          cardNumber: state.currentUser?.bankData?.cardNumber || '',
                          cardName: state.currentUser?.bankData?.cardName || '',
                          expiryDate: state.currentUser?.bankData?.expiryDate || '',
                          cvv: state.currentUser?.bankData?.cvv || '',
                        });
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    className="flex items-center px-4 py-2 text-pink-600 border border-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancelar' : 'Editar'}
                  </button>
                </div>

                {message && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                    {message}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Data */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Datos Básicos</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre de Usuario
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                            isEditing 
                              ? 'focus:ring-2 focus:ring-pink-500 focus:border-transparent' 
                              : 'bg-gray-50 cursor-not-allowed'
                          } transition-colors`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                            isEditing 
                              ? 'focus:ring-2 focus:ring-pink-500 focus:border-transparent' 
                              : 'bg-gray-50 cursor-not-allowed'
                          } transition-colors`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dirección
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="Ingrese su dirección"
                          className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                            isEditing 
                              ? 'focus:ring-2 focus:ring-pink-500 focus:border-transparent' 
                              : 'bg-gray-50 cursor-not-allowed'
                          } transition-colors`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Banking Data */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Datos Bancarios</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre en Tarjeta
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="Nombre como aparece en la tarjeta"
                          className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                            isEditing 
                              ? 'focus:ring-2 focus:ring-pink-500 focus:border-transparent' 
                              : 'bg-gray-50 cursor-not-allowed'
                          } transition-colors`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número de Tarjeta
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="**** **** **** ****"
                          className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                            isEditing 
                              ? 'focus:ring-2 focus:ring-pink-500 focus:border-transparent' 
                              : 'bg-gray-50 cursor-not-allowed'
                          } transition-colors`}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vencimiento
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="MM/AA"
                            className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                              isEditing 
                                ? 'focus:ring-2 focus:ring-pink-500 focus:border-transparent' 
                                : 'bg-gray-50 cursor-not-allowed'
                            } transition-colors`}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="***"
                            className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                              isEditing 
                                ? 'focus:ring-2 focus:ring-pink-500 focus:border-transparent' 
                                : 'bg-gray-50 cursor-not-allowed'
                            } transition-colors`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleSaveChanges}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-colors transform hover:scale-105"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Historial de Compras</h2>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total gastado</p>
                    <p className="text-2xl font-bold text-pink-600">${totalSpent.toFixed(2)}</p>
                  </div>
                </div>

                {state.currentUser.purchaseHistory.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No tienes compras aún
                    </h3>
                    <p className="text-gray-600">
                      Explora nuestro catálogo y realiza tu primera compra
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {state.currentUser.purchaseHistory
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map(purchase => (
                      <div key={purchase.id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              Pedido #{purchase.id}
                            </h3>
                            <div className="flex items-center text-gray-600 text-sm">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(purchase.date)}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-pink-600">
                              ${purchase.total.toFixed(2)}
                            </p>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {purchase.status === 'completed' ? 'Completado' : purchase.status}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {purchase.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                              <div className="flex items-center">
                                <Package className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-700">
                                  {item.name} x {item.quantity}
                                </span>
                              </div>
                              <span className="font-semibold text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Método de pago: {purchase.paymentMethod}</span>
                            <span>Entregado en: {purchase.address}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
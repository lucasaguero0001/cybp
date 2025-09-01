import React, { useState } from 'react';
import { Edit, Trash2, UserCheck, UserX, Mail } from 'lucide-react';
import { useAppContext, User } from '../../context/AppContext';

export const UserManagement: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'client'>('all');
  const [filterEmail, setFilterEmail] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredUsers = state.users.filter(user => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesEmail = user.email.toLowerCase().includes(filterEmail.toLowerCase());
    return matchesRole && matchesEmail;
  });

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = (userId: string, username: string) => {
    if (userId === state.currentUser?.id) {
      alert('No puedes eliminar tu propia cuenta');
      return;
    }
    
    if (window.confirm(`¿Estás seguro de que quieres eliminar al usuario ${username}?`)) {
      dispatch({ type: 'DELETE_USER', payload: userId });
    }
  };

  const handleSaveUser = () => {
    if (!editingUser) return;

    dispatch({
      type: 'UPDATE_USER',
      payload: {
        userId: editingUser.id,
        data: {
          role: editingUser.role,
          username: editingUser.username,
          email: editingUser.email,
        }
      }
    });

    setShowModal(false);
    setEditingUser(null);
  };

  const handleRoleChange = (role: 'admin' | 'client') => {
    if (!editingUser) return;
    setEditingUser({ ...editingUser, role });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
        <div className="text-sm text-gray-600">
          Total: {state.users.length} usuarios
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por rol
          </label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Todos los roles</option>
            <option value="admin">Administradores</option>
            <option value="client">Clientes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar por email
          </label>
          <input
            type="text"
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
            placeholder="Buscar email..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Usuario</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rol</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Compras</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-white transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {user.role === 'admin' ? (
                        <UserCheck className="h-5 w-5 text-purple-500 mr-3" />
                      ) : (
                        <UserX className="h-5 w-5 text-gray-400 mr-3" />
                      )}
                      <div>
                        <div className="font-semibold text-gray-900">{user.username}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-700">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {user.purchaseHistory?.length || 0}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar usuario"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      {user.id !== state.currentUser?.id && (
                        <button
                          onClick={() => handleDeleteUser(user.id, user.username)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar usuario"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {showModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Editar Usuario: {editingUser.username}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    value={editingUser.username}
                    onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rol
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={editingUser.role === 'client'}
                        onChange={() => handleRoleChange('client')}
                        className="mr-2 text-purple-600 focus:ring-purple-500"
                      />
                      Cliente
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={editingUser.role === 'admin'}
                        onChange={() => handleRoleChange('admin')}
                        className="mr-2 text-purple-600 focus:ring-purple-500"
                      />
                      Administrador
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveUser}
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
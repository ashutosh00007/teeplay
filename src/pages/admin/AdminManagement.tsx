import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAdmins, addAdmin, revokeAdmin } from '../../utils/storage';
import { User } from '../../types';

const AdminManagement: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [admins, setAdmins] = useState<User[]>(getAdmins());
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();

    addAdmin(formData.email, formData.password, formData.name);
    setAdmins(getAdmins());
    setIsAdding(false);
    setFormData({ email: '', password: '', name: '' });
    alert('Admin added successfully!');
  };

  const handleRevokeAdmin = (userId: string) => {
    const user = admins.find((u) => u.id === userId);

    if (user?.isSuperAdmin) {
      alert('Cannot revoke super-admin privileges.');
      return;
    }

    if (currentUser?.isSuperAdmin) {
      if (window.confirm('Are you sure you want to revoke admin privileges from this user?')) {
        const success = revokeAdmin(userId);
        if (success) {
          setAdmins(getAdmins());
          alert('Admin privileges revoked successfully!');
        } else {
          alert('Failed to revoke admin privileges.');
        }
      }
    } else {
      alert('Only the super-admin can revoke admin privileges.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4">
        <Link to="/admin" className="text-primary-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Management</h1>

      {!currentUser?.isSuperAdmin && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Only the super-admin can add or revoke administrators.
          </p>
        </div>
      )}

      {currentUser?.isSuperAdmin && !isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="mb-6 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Add New Admin
        </button>
      )}

      {isAdding && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Administrator</h2>
          <form onSubmit={handleAddAdmin}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Add Admin
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b">
                <td className="py-3 px-4 font-medium">{admin.name}</td>
                <td className="py-3 px-4">{admin.email}</td>
                <td className="py-3 px-4">
                  {admin.isSuperAdmin ? (
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      Super Admin
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
                      Admin
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {!admin.isSuperAdmin && currentUser?.isSuperAdmin && (
                    <button
                      onClick={() => handleRevokeAdmin(admin.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Revoke Admin
                    </button>
                  )}
                  {admin.isSuperAdmin && (
                    <span className="text-gray-400 text-sm">Cannot be revoked</span>
                  )}
                  {!currentUser?.isSuperAdmin && !admin.isSuperAdmin && (
                    <span className="text-gray-400 text-sm">Super-admin only</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManagement;

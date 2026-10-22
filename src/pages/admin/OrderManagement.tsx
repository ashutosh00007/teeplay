import React from 'react';
import { Link } from 'react-router-dom';
import { getOrders, updateOrderStatus } from '../../utils/storage';
import { Order } from '../../types';

const OrderManagement: React.FC = () => {
  const orders = getOrders();

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    if (window.confirm(`Change order status to ${newStatus}?`)) {
      updateOrderStatus(orderId, newStatus);
      window.location.reload();
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4">
        <Link to="/admin" className="text-primary-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Management</h1>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Shipping Address</h4>
                  <p className="text-sm text-gray-600">{order.shippingAddress.name}</p>
                  <p className="text-sm text-gray-600">{order.shippingAddress.address}</p>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Order Details</h4>
                  <p className="text-sm text-gray-600">{order.items.length} items</p>
                  <p className="text-lg font-bold text-primary-600">${order.total.toFixed(2)}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-700 mb-2">Update Status</h4>
                <div className="flex flex-wrap gap-2">
                  {(['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as Order['status'][]).map(status => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(order.id, status)}
                      disabled={order.status === status}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        order.status === status
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-primary-100 text-primary-800 hover:bg-primary-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600">No orders yet.</p>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;

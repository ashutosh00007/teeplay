import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Order } from '../types';

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order as Order;

  if (!order) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
        <p className="text-lg font-semibold text-primary-600 mb-6">Order ID: {order.id}</p>

        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total:</span>
              <span className="font-semibold">${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold capitalize">{order.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping Address:</span>
              <span className="font-semibold text-right">
                {order.shippingAddress.name}<br />
                {order.shippingAddress.address}<br />
                {order.shippingAddress.city}, {order.shippingAddress.zipCode}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/products')}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;

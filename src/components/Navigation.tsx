import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navigation: React.FC = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">Teeplay</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`nav-link ${isActive('/products') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
            >
              Products
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/cart"
                  className={`nav-link flex items-center ${isActive('/cart') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
                >
                  Cart
                  {getCartCount() > 0 && (
                    <span className="ml-2 bg-primary-600 text-white text-xs rounded-full px-2 py-1">
                      {getCartCount()}
                    </span>
                  )}
                </Link>
                <Link
                  to="/profile"
                  className={`nav-link ${isActive('/profile') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
                >
                  Profile
                </Link>
              </>
            )}

            {isAdmin && (
              <Link
                to="/admin"
                className={`nav-link ${isActive('/admin') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
              >
                Admin
              </Link>
            )}

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

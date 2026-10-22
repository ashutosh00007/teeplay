import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../utils/storage';

const Home: React.FC = () => {
  const products = getProducts();
  const featuredProducts = products.filter((p) => p.featured);
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Teeplay</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Premium Streetwear T-Shirts for the Modern Generation
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Shop by Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category}</h3>
                <p className="text-gray-600">
                  {products.filter((p) => p.category === category).length} products
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Teeplay</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Teeplay is your destination for premium streetwear t-shirts. We combine quality
            materials with cutting-edge designs to bring you the perfect blend of style and comfort.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;

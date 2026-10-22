import { User, Product, Order } from '../types';

export const SUPER_ADMIN_EMAIL = 'ashutoshkhajuria@gmail.com';
export const SUPER_ADMIN_PASSWORD = 'ashutosh';

export const mockUsers: User[] = [
  {
    id: '1',
    email: SUPER_ADMIN_EMAIL,
    password: SUPER_ADMIN_PASSWORD,
    name: 'Ashutosh Khajuria',
    role: 1, // ADMIN
    isSuperAdmin: true,
  },
  {
    id: '2',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 1, // ADMIN
    isSuperAdmin: false,
  },
  {
    id: '3',
    email: 'customer@example.com',
    password: 'customer123',
    name: 'John Doe',
    role: 2, // CLIENT
  },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Urban Street Classic',
    description: 'Premium cotton t-shirt with minimalist urban design. Perfect for everyday wear.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    category: 'Classic',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Gray'],
    featured: true,
  },
  {
    id: '2',
    name: 'Graffiti Art Edition',
    description: 'Bold graffiti-inspired print on high-quality fabric. Stand out from the crowd.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&h=500&fit=crop',
    category: 'Graphic',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Red'],
    featured: true,
  },
  {
    id: '3',
    name: 'Minimalist Essentials',
    description: 'Clean, simple design for the modern minimalist. Versatile and timeless.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop',
    category: 'Classic',
    sizes: ['S', 'M', 'L'],
    colors: ['White', 'Beige', 'Light Gray'],
    featured: true,
  },
  {
    id: '4',
    name: 'Neon Nights',
    description: 'Vibrant neon colors that glow in the dark. Perfect for parties and festivals.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop',
    category: 'Graphic',
    sizes: ['M', 'L', 'XL'],
    colors: ['Neon Green', 'Neon Pink', 'Neon Blue'],
    featured: false,
  },
  {
    id: '5',
    name: 'Vintage Wash',
    description: 'Pre-washed vintage look with soft, comfortable feel. Retro style meets modern comfort.',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=500&fit=crop',
    category: 'Vintage',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Vintage White', 'Vintage Black', 'Vintage Blue'],
    featured: false,
  },
  {
    id: '6',
    name: 'Abstract Patterns',
    description: 'Unique abstract geometric patterns. Each shirt is a work of art.',
    price: 36.99,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=500&fit=crop',
    category: 'Graphic',
    sizes: ['S', 'M', 'L'],
    colors: ['Multi-color', 'Black'],
    featured: false,
  },
  {
    id: '7',
    name: 'Cozy Oversized',
    description: 'Relaxed oversized fit for maximum comfort. Perfect for lounging.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&h=500&fit=crop',
    category: 'Classic',
    sizes: ['L', 'XL', 'XXL'],
    colors: ['Heather Gray', 'Navy', 'Black'],
    featured: true,
  },
  {
    id: '8',
    name: 'Retro Sports',
    description: 'Classic sports-inspired designs with a retro twist. Nostalgic and stylish.',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=500&fit=crop',
    category: 'Vintage',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Red', 'Green'],
    featured: false,
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '3',
    items: [
      {
        productId: '1',
        quantity: 2,
        size: 'M',
        color: 'Black',
      },
    ],
    total: 59.98,
    status: 'delivered',
    createdAt: '2024-01-15T10:30:00Z',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'New York',
      zipCode: '10001',
    },
  },
  {
    id: 'ORD-002',
    userId: '3',
    items: [
      {
        productId: '2',
        quantity: 1,
        size: 'L',
        color: 'Red',
      },
    ],
    total: 34.99,
    status: 'shipped',
    createdAt: '2024-01-20T14:45:00Z',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'New York',
      zipCode: '10001',
    },
  },
];

import { User, Product, Order, CartItem } from '../types';
import { mockUsers, mockProducts, mockOrders, SUPER_ADMIN_EMAIL } from '../data/mockData';

const STORAGE_KEYS = {
  USERS: 'teeplay_users',
  PRODUCTS: 'teeplay_products',
  ORDERS: 'teeplay_orders',
  CART: 'teeplay_cart',
  CURRENT_USER: 'teeplay_current_user',
};

// Initialize localStorage with mock data if empty
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(mockProducts));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(mockOrders));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CART)) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
  }
};

// Users
export const getUsers = (): User[] => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

// Products
export const getProducts = (): Product[] => {
  const products = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  return products ? JSON.parse(products) : [];
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
};

export const getProductById = (id: string): Product | undefined => {
  const products = getProducts();
  return products.find(p => p.id === id);
};

// Orders
export const getOrders = (): Order[] => {
  const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return orders ? JSON.parse(orders) : [];
};

export const saveOrders = (orders: Order[]) => {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
};

export const getOrdersByUserId = (userId: string): Order[] => {
  const orders = getOrders();
  return orders.filter(o => o.userId === userId);
};

export const addOrder = (order: Order) => {
  const orders = getOrders();
  orders.push(order);
  saveOrders(orders);
};

export const updateOrderStatus = (orderId: string, status: Order['status']) => {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    saveOrders(orders);
  }
};

// Cart
export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem(STORAGE_KEYS.CART);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
};

// Admin management
export const addAdmin = (email: string, password: string, name: string) => {
  const users = getUsers();
  const newAdmin: User = {
    id: Date.now().toString(),
    email,
    password,
    name,
    role: 1, // ADMIN
    isSuperAdmin: false,
  };
  users.push(newAdmin);
  saveUsers(users);
  return newAdmin;
};

export const revokeAdmin = (userId: string) => {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  
  // Cannot revoke super admin
  if (user?.isSuperAdmin) {
    return false;
  }
  
  if (user && user.role === 1) {
    user.role = 2; // Change to CLIENT
    saveUsers(users);
    return true;
  }
  return false;
};

export const getAdmins = (): User[] => {
  const users = getUsers();
  return users.filter(u => u.role === 1);
};

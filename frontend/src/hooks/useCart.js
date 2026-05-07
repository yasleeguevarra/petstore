import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import cartApi from '../services/cartApi';
import { getPetById } from '../services/petApi';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [localCart, setLocalCart] = useState(() => {
    const saved = localStorage.getItem('localCart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('localCart', JSON.stringify(localCart));
  }, [localCart]);

  useEffect(() => {
    setCartItems(localCart);
  }, [localCart]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = async (petId, quantity = 1) => {
    try {
      const pet = await getPetById(petId);
      const newItem = { id: Date.now(), pet, quantity };
      setLocalCart(prev => {
        const existing = prev.find(item => item.pet.id === petId);
        if (existing) {
          return prev.map(item =>
            item.pet.id === petId ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [...prev, newItem];
      });
      setCartItems(prev => {
        const existing = prev.find(item => item.pet.id === petId);
        if (existing) {
          return prev.map(item =>
            item.pet.id === petId ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [...prev, newItem];
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      setLocalCart(prev => prev.filter(item => item.id !== itemId));
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      return;
    }
    setLocalCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity } : item));
    setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity } : item));
  };

  const removeFromCart = async (itemId) => {
    setLocalCart(prev => prev.filter(item => item.id !== itemId));
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = async () => {
    setLocalCart([]);
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.pet.price * item.quantity), 0);
  };

  return {
    cartItems,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    loadCart,
    getTotalItems,
    getTotalPrice
  };
};
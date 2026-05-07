import { useState, useEffect } from 'react';
import { getPetById } from '../services/petApi';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [localWishlist, setLocalWishlist] = useState(() => {
    const saved = localStorage.getItem('localWishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('localWishlist', JSON.stringify(localWishlist));
  }, [localWishlist]);

  useEffect(() => {
    setWishlistItems(localWishlist);
  }, [localWishlist]);

  const addToWishlist = async (petId) => {
    try {
      const pet = await getPetById(petId);
      const newItem = { id: Date.now(), pet };
      setLocalWishlist(prev => {
        const existing = prev.find(item => item.pet.id === petId);
        if (existing) {
          return prev; // Already in wishlist
        }
        return [...prev, newItem];
      });
      setWishlistItems(prev => {
        const existing = prev.find(item => item.pet.id === petId);
        if (existing) {
          return prev; // Already in wishlist
        }
        return [...prev, newItem];
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const removeFromWishlist = async (itemId) => {
    setLocalWishlist(prev => prev.filter(item => item.id !== itemId));
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearWishlist = async () => {
    setLocalWishlist([]);
    setWishlistItems([]);
  };

  const isInWishlist = (petId) => {
    return wishlistItems.some(item => item.pet.id === petId);
  };

  return {
    wishlistItems,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist
  };
};
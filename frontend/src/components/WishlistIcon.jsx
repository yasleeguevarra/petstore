import React from 'react';
import { IconButton, Badge } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';

const WishlistIcon = ({ petId }) => {
  const navigate = useNavigate();
  const { isInWishlist, addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();

  const handleClick = (e) => {
    e.stopPropagation();
    if (isInWishlist(petId)) {
      const item = wishlistItems.find(item => item.pet.id === petId);
      if (item) {
        removeFromWishlist(item.id);
      }
    } else {
      addToWishlist(petId);
    }
  };

  const handleNavigate = (e) => {
    e.stopPropagation();
    navigate('/wishlist');
  };

  return (
    <IconButton onClick={petId ? handleClick : handleNavigate}>
      <Badge badgeContent={petId ? 0 : wishlistItems.length} color="secondary">
        {petId ? (
          isInWishlist(petId) ? <Favorite color="error" /> : <FavoriteBorder />
        ) : (
          <Favorite />
        )}
      </Badge>
    </IconButton>
  );
};

export default WishlistIcon;
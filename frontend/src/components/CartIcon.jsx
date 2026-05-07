import React from 'react';
import { IconButton, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const CartIcon = () => {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();

  return (
    <IconButton color="inherit" onClick={() => navigate('/cart')}>
      <Badge badgeContent={getTotalItems()} color="secondary">
        <ShoppingCart />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
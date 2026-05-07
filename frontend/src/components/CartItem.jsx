import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useCart } from '../hooks/useCart';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (delta) => {
    updateQuantity(item.id, item.quantity + delta);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <Card sx={{ display: 'flex', mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, objectFit: 'cover' }}
        image={item.pet.imageUrl || '/placeholder-pet.jpg'}
        alt={item.pet.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            {item.pet.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            ${item.pet.price}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <IconButton size="small" onClick={() => handleQuantityChange(-1)}>
              <Remove />
            </IconButton>
            <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
            <IconButton size="small" onClick={() => handleQuantityChange(1)}>
              <Add />
            </IconButton>
            <IconButton size="small" color="error" onClick={handleRemove} sx={{ ml: 2 }}>
              <Delete />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Total: ${(item.pet.price * item.quantity).toFixed(2)}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CartItem;
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton } from '@mui/material';
import { Delete, ShoppingCart } from '@mui/icons-material';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';

const WishlistItem = ({ item }) => {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemove = () => {
    removeFromWishlist(item.id);
  };

  const handleAddToCart = () => {
    addToCart(item.pet.id);
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
          <Typography variant="body2" color="text.secondary">
            {item.pet.type} • {item.pet.age} months old
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              sx={{ mr: 1 }}
            >
              Add to Cart
            </Button>
            <IconButton size="small" color="error" onClick={handleRemove}>
              <Delete />
            </IconButton>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default WishlistItem;
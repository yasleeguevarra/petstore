import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Button, Box } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import WishlistIcon from './WishlistIcon';

const PetCard = ({ pet, onClick }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent triggering onClick
    addToCart(pet.id);
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300 max-w-sm"
      onClick={() => onClick(pet)}
    >
      <CardMedia
        component="img"
        height="200"
        image={pet.imageUrl || '/placeholder-pet.jpg'}
        alt={pet.name}
        className="object-cover"
        loading="lazy"
      />
      <CardContent>
        <div className="flex justify-between items-start mb-2">
          <Typography variant="h6" component="h2" className="font-bold">
            {pet.name}
          </Typography>
          <Chip
            label={pet.isAvailable ? 'Available' : 'Unavailable'}
            color={pet.isAvailable ? 'success' : 'error'}
            size="small"
          />
        </div>
        <Typography variant="body2" color="text.secondary" className="mb-2">
          {pet.type} • {pet.age} months old
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary" className="font-bold">
            ${pet.price}
          </Typography>
          <WishlistIcon petId={pet.id} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PetCard;
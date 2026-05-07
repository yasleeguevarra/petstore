import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { useCart } from '../hooks/useCart';

const OrderSummary = () => {
  const { cartItems, getTotalPrice } = useCart();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          Order Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {cartItems.map(item => (
          <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">
              {item.pet.name} x {item.quantity}
            </Typography>
            <Typography variant="body2">
              ${(item.pet.price * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        ))}
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6" color="primary">
            ${getTotalPrice().toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
import React from 'react';
import { Container, Typography, Box, Button, Alert, CircularProgress } from '@mui/material';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { cartItems, loading, error, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Your cart is empty
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 2 }}>
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
            <Typography variant="h6">
              Total: ${getTotalPrice().toFixed(2)}
            </Typography>
            <Box>
              <Button variant="outlined" onClick={clearCart} sx={{ mr: 2 }}>
                Clear Cart
              </Button>
              <Button variant="contained" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CartPage;
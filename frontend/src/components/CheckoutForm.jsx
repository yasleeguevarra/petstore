import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import orderApi from '../services/orderApi';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const order = await orderApi.createOrder();
      clearCart();
      navigate('/order-confirmation', { state: { order } });
    } catch (err) {
      setError(err.response?.data?.error || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Your cart is empty. Add some pets to checkout.
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/')}>
          Browse Pets
        </Button>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Checkout
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Shipping Information
      </Typography>
      <TextField
        fullWidth
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        margin="normal"
        required
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="ZIP Code"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          margin="normal"
          required
        />
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Payment Information
      </Typography>
      <TextField
        fullWidth
        label="Card Number"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleChange}
        margin="normal"
        required
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          label="Expiry Date (MM/YY)"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="CVV"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          margin="normal"
          required
        />
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Place Order'}
      </Button>
    </Box>
  );
};

export default CheckoutForm;
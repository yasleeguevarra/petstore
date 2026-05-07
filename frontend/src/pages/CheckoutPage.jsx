import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import CheckoutForm from '../components/CheckoutForm';
import OrderSummary from '../components/OrderSummary';

const CheckoutPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <CheckoutForm />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            <OrderSummary />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
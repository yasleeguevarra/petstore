import React from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Order Confirmation
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          We could not find your order details. Please check your order history or return to shopping.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>Go to Home</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Thank you for your order!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Order ID: {order.id}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Total Amount: ${order.totalPrice?.toFixed(2) ?? order.total?.toFixed(2)}
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Order Items
        </Typography>
        <List>
          {order.orderItems?.map(item => (
            <ListItem key={item.id} disableGutters>
              <ListItemText
                primary={`${item.pet?.name ?? item.petName} x ${item.quantity}`}
                secondary={`$${((item.pet?.price ?? item.price) * item.quantity).toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" onClick={() => navigate('/')}>Continue Shopping</Button>
      </Box>
    </Container>
  );
};

export default OrderConfirmationPage;

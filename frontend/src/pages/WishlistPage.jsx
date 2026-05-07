import React from 'react';
import { Container, Typography, Box, Button, Alert, CircularProgress } from '@mui/material';
import { useWishlist } from '../hooks/useWishlist';
import { useNavigate } from 'react-router-dom';
import WishlistItem from '../components/WishlistItem';

const WishlistPage = () => {
  const { wishlistItems, loading, error, clearWishlist } = useWishlist();
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
        My Wishlist
      </Typography>

      {wishlistItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Your wishlist is empty
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/')}>
            Browse Pets
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 2 }}>
            {wishlistItems.map(item => (
              <WishlistItem key={item.id} item={item} />
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button variant="outlined" onClick={clearWishlist}>
              Clear Wishlist
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default WishlistPage;
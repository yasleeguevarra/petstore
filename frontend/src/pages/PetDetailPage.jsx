import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getPetById } from '../services/petApi';
import { useCart } from '../hooks/useCart';
import WishlistIcon from '../components/WishlistIcon';

const PetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(pet.id);
  };

  useEffect(() => {
    loadPet();
  }, [id]);

  const loadPet = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPetById(id);
      if (response.success) {
        setPet(response.data);
      } else {
        setError(response.error || 'Failed to load pet details');
      }
    } catch (err) {
      setError(err.message || 'Network error occurred');
      console.error('Error loading pet:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Container maxWidth="md" className="py-8">
        <Typography variant="h6">Loading pet details...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" className="py-8">
        <Typography variant="h6" color="error" className="mb-4">
          Error: {error}
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
        >
          Back to Gallery
        </Button>
      </Container>
    );
  }

  if (!pet) {
    return (
      <Container maxWidth="md" className="py-8">
        <Typography variant="h6" color="text.secondary">
          Pet not found.
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
          className="mt-4"
        >
          Back to Gallery
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="py-8">
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={handleBackClick}
        className="mb-6"
      >
        Back to Gallery
      </Button>

      <Paper elevation={3} className="p-6">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={pet.imageUrl || '/placeholder-pet.jpg'}
              alt={pet.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box className="space-y-4">
              <Box className="flex justify-between items-start">
                <Typography variant="h3" component="h1" className="font-bold">
                  {pet.name}
                </Typography>
                <Chip
                  label={pet.isAvailable ? 'Available' : 'Unavailable'}
                  color={pet.isAvailable ? 'success' : 'error'}
                  size="large"
                />
              </Box>

              <Box className="space-y-2">
                <Typography variant="h5" color="primary" className="font-bold">
                  ${pet.price}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {pet.type} • {pet.age} months old
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  {pet.isAvailable && (
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      onClick={handleAddToCart}
                      size="large"
                    >
                      Add to Cart
                    </Button>
                  )}
                  <WishlistIcon petId={pet.id} />
                </Box>
              </Box>

              <Typography variant="body1" className="leading-relaxed">
                {pet.description}
              </Typography>

              {pet.careRequirements && (
                <Box className="mt-6">
                  <Typography variant="h6" className="font-semibold mb-2">
                    Care Requirements
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pet.careRequirements}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PetDetailPage;
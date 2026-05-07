import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm" className="py-16 text-center">
      <Box className="space-y-6">
        <Typography variant="h1" component="h1" className="text-6xl font-bold text-gray-400">
          404
        </Typography>
        <Typography variant="h4" component="h2" className="font-semibold">
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={handleHomeClick}
          className="mt-8"
        >
          Back to Pet Gallery
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
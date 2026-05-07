import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import PetCard from './PetCard';

const PetGallery = ({ pets, onPetClick, loading, error, totalCount, currentFilters }) => {
  if (loading) {
    return (
      <Box className="flex justify-center items-center py-12">
        <Typography variant="h6">Loading pets...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex justify-center items-center py-12">
        <Typography variant="h6" color="error">
          Error loading pets: {error}
        </Typography>
      </Box>
    );
  }

  if (!pets || pets.length === 0) {
    return (
      <Box className="flex justify-center items-center py-12">
        <Typography variant="h6" color="text.secondary">
          No pets found matching your criteria.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="py-6">
      <Typography variant="h4" component="h1" className="text-center mb-4 font-bold">
        Available Pets
      </Typography>
      {totalCount !== undefined && (
        <Typography variant="body1" color="text.secondary" className="text-center mb-8">
          {totalCount} pet{totalCount !== 1 ? 's' : ''} found
          {currentFilters && Object.values(currentFilters).some(v => v) && ' (filtered)'}
        </Typography>
      )}
      <Grid container spacing={3} className="justify-center">
        {pets.map((pet) => (
          <Grid item key={pet.id} xs={12} sm={6} md={4} lg={3}>
            <PetCard pet={pet} onClick={onPetClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PetGallery;
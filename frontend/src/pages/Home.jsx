import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import PetGallery from '../components/PetGallery';
import SearchFilter from '../components/SearchFilter';
import { getPets } from '../services/petApi';

const Home = () => {
  const [pets, setPets] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilters, setCurrentFilters] = useState({});

  useEffect(() => {
    loadPets({});
  }, []);

  const loadPets = async (filters = {}) => {
    const startTime = performance.now();
    try {
      setLoading(true);
      setError(null);
      const response = await getPets(filters);
      if (response.success) {
        setPets(response.data.pets);
        setTotalCount(response.data.totalElements);
        setCurrentFilters(filters);
      } else {
        setError(response.error || 'Failed to load pets');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Error loading pets:', err);
    } finally {
      setLoading(false);
      const endTime = performance.now();
      console.log(`Pet gallery load time: ${(endTime - startTime).toFixed(2)}ms`);
    }
  };

  const handleFilterChange = (filters) => {
    loadPets(filters);
  };

  const handleClearFilters = () => {
    loadPets({});
  };

  const handlePetClick = (pet) => {
    // Navigate to pet detail page
    window.location.href = `/pet/${pet.id}`;
  };

  return (
    <Container maxWidth="xl" className="min-h-screen bg-gray-50">
      <SearchFilter
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
      <PetGallery
        pets={pets}
        onPetClick={handlePetClick}
        loading={loading}
        error={error}
        totalCount={totalCount}
        currentFilters={currentFilters}
      />
    </Container>
  );
};

export default Home;
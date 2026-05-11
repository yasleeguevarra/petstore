import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { getPetTypes } from '../services/petApi';

const SearchFilter = ({ onFilterChange, onClearFilters }) => {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    minAge: '',
    maxAge: ''
  });
  const [petTypes, setPetTypes] = useState([]);

  useEffect(() => {
    loadPetTypes();
  }, []);

  const loadPetTypes = async () => {
    try {
      const response = await getPetTypes();
      if (response.success) {
        setPetTypes(response.data);
      }
    } catch (error) {
      console.error('Error loading pet types:', error);
    }
  };

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      minAge: '',
      maxAge: ''
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <Paper elevation={2} className="p-6 mb-6">
      <Typography variant="h6" component="h2" className="mb-4 font-semibold">
        Search & Filter Pets
      </Typography>

      <form onSubmit={handleSearchSubmit}>
        <Grid container spacing={3} alignItems="center">
          {/* Search Input */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search pets"
              variant="outlined"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Name or description..."
              InputProps={{
                endAdornment: <SearchIcon color="action" />
              }}
            />
          </Grid>

          {/* Pet Type Filter */}
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={filters.type}
                label="Type"
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <MenuItem value="">
                  <em>All Types</em>
                </MenuItem>
                {petTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Price Range */}
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              fullWidth
              label="Min Price"
              type="number"
              variant="outlined"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              fullWidth
              label="Max Price"
              type="number"
              variant="outlined"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Grid>

          {/* Age Range */}
          <Grid item xs={6} sm={3} md={1}>
            <TextField
              fullWidth
              label="Min Age"
              type="number"
              variant="outlined"
              value={filters.minAge}
              onChange={(e) => handleFilterChange('minAge', e.target.value)}
              inputProps={{ min: 1, max: 240 }}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={1}>
            <TextField
              fullWidth
              label="Max Age"
              type="number"
              variant="outlined"
              value={filters.maxAge}
              onChange={(e) => handleFilterChange('maxAge', e.target.value)}
              inputProps={{ min: 1, max: 240 }}
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12} md={12} className="flex gap-2 justify-end">
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={handleClearFilters}
              color="secondary"
            >
              Clear Filters
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SearchFilter;
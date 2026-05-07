const API_BASE_URL = '/api/guevarra';

export const getPets = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    if (filters.type) params.append('type', filters.type);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.minAge) params.append('minAge', filters.minAge);
    if (filters.maxAge) params.append('maxAge', filters.maxAge);
    if (filters.search) params.append('search', filters.search);
    if (filters.page !== undefined) params.append('page', filters.page);
    if (filters.size) params.append('size', filters.size);

    const response = await fetch(`${API_BASE_URL}/pets?${params}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getPetById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pets/${id}`);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Pet not found');
      }
      throw new Error(data.error || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getPetTypes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/pets/types`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
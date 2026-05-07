import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/guevarra';

class WishlistApi {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
    });

    // Add request interceptor to include auth token
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async getWishlist() {
    const response = await this.client.get('/wishlist');
    return response.data;
  }

  async addToWishlist(petId) {
    const response = await this.client.post('/wishlist/add', { petId });
    return response.data;
  }

  async removeFromWishlist(itemId) {
    const response = await this.client.delete(`/wishlist/item/${itemId}`);
    return response.data;
  }

  async clearWishlist() {
    const response = await this.client.delete('/wishlist');
    return response.data;
  }
}

export default new WishlistApi();
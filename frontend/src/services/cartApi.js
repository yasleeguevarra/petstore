import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/guevarra';

class CartApi {
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

  async getCart() {
    const response = await this.client.get('/cart');
    return response.data;
  }

  async addToCart(petId, quantity = 1) {
    const response = await this.client.post('/cart/add', { petId, quantity });
    return response.data;
  }

  async updateCartItem(itemId, quantity) {
    const response = await this.client.put(`/cart/item/${itemId}`, { quantity });
    return response.data;
  }

  async removeFromCart(itemId) {
    const response = await this.client.delete(`/cart/item/${itemId}`);
    return response.data;
  }

  async clearCart() {
    const response = await this.client.delete('/cart');
    return response.data;
  }
}

export default new CartApi();
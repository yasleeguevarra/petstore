import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/guevarra';

class OrderApi {
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

  async createOrder() {
    const response = await this.client.post('/orders');
    return response.data;
  }

  async getUserOrders() {
    const response = await this.client.get('/orders');
    return response.data;
  }

  async getOrder(orderId) {
    const response = await this.client.get(`/orders/${orderId}`);
    return response.data;
  }
}

export default new OrderApi();
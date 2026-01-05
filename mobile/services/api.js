import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // Increased to 30 seconds for network issues
});

// Products API
export const productService = {
  getAll: async (page = 0, size = 20, sortBy = 'id', sortDir = 'ASC', category = null, search = null) => {
    const params = { page, size, sortBy, sortDir };
    if (category) params.category = category;
    if (search) params.search = search;
    
    // DEBUG: Log API call
    console.log('🌐 [API] productService.getAll called with params:', params);
    console.log('🌐 [API] Full URL will be:', `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}?${new URLSearchParams(params).toString()}`);
    
    const response = await api.get(API_ENDPOINTS.PRODUCTS, { params });
    
    // DEBUG: Log response
    console.log('🌐 [API] Response received:', {
      totalElements: response.data.totalElements,
      productsCount: response.data.content?.length || 0
    });
    
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);
    return response.data;
  },
};

// Reviews API
export const reviewService = {
  create: async (reviewData) => {
    const response = await api.post(API_ENDPOINTS.REVIEWS, reviewData);
    return response.data;
  },
  
  getByProductId: async (productId, page = 0, size = 20, sortBy = 'createdAt', sortDir = 'DESC', minRating = null) => {
    const params = { page, size, sortBy, sortDir };
    if (minRating !== null && minRating !== undefined) {
      params.minRating = minRating;
    }
    const response = await api.get(`${API_ENDPOINTS.REVIEWS}/product/${productId}`, {
      params,
    });
    return response.data;
  },
};

export default api;



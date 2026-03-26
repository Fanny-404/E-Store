import axios from 'axios';
import { Product } from '../types/product';

const API_BASE_URL = 'https://fakestoreapi.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const apiService = {
  /**
   * Fetch all products from the API
   */
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await apiClient.get<Product[]>('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products. Please try again later.');
    }
  },

  /**
   * Fetch a single product by ID
   */
  getProductById: async (id: number): Promise<Product> => {
    try {
      const response = await apiClient.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product details.');
    }
  },

  /**
   * Fetch all available categories
   */
  getCategories: async (): Promise<string[]> => {
    try {
      const response = await apiClient.get<string[]>('/products/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories.');
    }
  },

  /**
   * Fetch products by category
   */
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await apiClient.get<Product[]>(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw new Error(`Failed to fetch products in category: ${category}`);
    }
  },
};

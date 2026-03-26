import { apiService, setApiClient } from '../../services/api';
import type { AxiosInstance } from 'axios';

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('should fetch all products successfully', async () => {
      const mockProducts = [
        {
          id: 1,
          title: 'Product 1',
          price: 10,
          description: 'Test',
          category: 'electronics',
          image: 'url',
        },
      ];

      const mockedClient = {
        get: jest.fn().mockResolvedValue({ data: mockProducts }),
      } as unknown as AxiosInstance;

      setApiClient(mockedClient);

      const result = await apiService.getAllProducts();

      expect(result).toEqual(mockProducts);
    });

    it('should throw error on API failure', async () => {
      const mockedClient = {
        get: jest.fn().mockRejectedValue(new Error('Network error')),
      } as unknown as AxiosInstance;

      setApiClient(mockedClient);

      await expect(apiService.getAllProducts()).rejects.toThrow('Failed to fetch products. Please try again later.');
    });
  });

  describe('getCategories', () => {
    it('should fetch categories successfully', async () => {
      const mockCategories = ['electronics', 'jewelery'];

      const mockedClient = {
        get: jest.fn().mockResolvedValue({ data: mockCategories }),
      } as unknown as AxiosInstance;

      setApiClient(mockedClient);

      const result = await apiService.getCategories();

      expect(result).toEqual(mockCategories);
    });
  });
});

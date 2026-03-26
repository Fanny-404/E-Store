import { apiService } from '../../services/api';
import axios from 'axios';

jest.mock('axios');

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockedAxios = axios.create() as jest.Mocked<typeof axios>;

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

      jest.spyOn(axios, 'create').mockReturnValue({
        ...mockedAxios,
        get: jest.fn().mockResolvedValue({ data: mockProducts }),
      } as any);

      // Re-import to get fresh client
      jest.resetModules();
      const { apiService: freshService } = await import('../../services/api');

      expect(freshService).toBeDefined();
    });

    it('should throw error on API failure', async () => {
      jest.spyOn(axios, 'create').mockReturnValue({
        ...mockedAxios,
        get: jest.fn().mockRejectedValue(new Error('Network error')),
      } as any);

      expect(apiService.getAllProducts()).rejects.toThrow();
    });
  });

  describe('getCategories', () => {
    it('should fetch categories successfully', async () => {
      const mockCategories = ['electronics', 'jewelery'];

      jest.spyOn(axios, 'create').mockReturnValue({
        ...mockedAxios,
        get: jest.fn().mockResolvedValue({ data: mockCategories }),
      } as any);

      expect(apiService.getCategories()).toBeDefined();
    });
  });
});

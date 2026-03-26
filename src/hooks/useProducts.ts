import { useState, useEffect, useCallback } from 'react';
import { Product, ProductsState } from '../types/product';
import { apiService } from '../services/api';

/**
 * Custom hook for managing products data and state
 */
export const useProducts = () => {
  const [state, setState] = useState<ProductsState>({
    products: [],
    loading: true,
    error: null,
    categories: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        // Fetch products and categories in parallel
        const [products, categories] = await Promise.all([
          apiService.getAllProducts(),
          apiService.getCategories(),
        ]);

        setState({
          products,
          categories,
          loading: false,
          error: null,
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch products';
        setState({
          products: [],
          categories: [],
          loading: false,
          error: errorMessage,
        });
      }
    };

    fetchData();
  }, []);

  const retry = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const [products, categories] = await Promise.all([
        apiService.getAllProducts(),
        apiService.getCategories(),
      ]);
      setState({
        products,
        categories,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch products';
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
    }
  }, []);

  return { ...state, retry };
};

/**
 * Custom hook for filtering and sorting products
 */
export const useFilteredProducts = (
  products: Product[],
  searchTerm: string,
  selectedCategory: string | null,
  sortBy: 'asc' | 'desc' | 'none'
) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (sortBy !== 'none') {
      result.sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;
        return sortBy === 'asc' ? priceA - priceB : priceB - priceA;
      });
    }

    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, sortBy]);

  return filteredProducts;
};

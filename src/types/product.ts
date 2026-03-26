export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface FilterState {
  searchTerm: string;
  selectedCategory: string | null;
  sortBy: 'asc' | 'desc' | 'none';
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
}

export interface AIDescriptionResponse {
  description: string;
  suggestions: string[];
  summary: string;
}

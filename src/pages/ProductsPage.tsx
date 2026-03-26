import React, { useState } from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { SortBar } from '../components/SortBar';
import { SkeletonGrid } from '../components/Skeleton';
import { useProducts, useFilteredProducts } from '../hooks/useProducts';
import '../styles/ProductsPage.css';

export const ProductsPage: React.FC = () => {
  const { products, categories, loading, error, retry } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | 'none'>('none');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useFilteredProducts(products, searchTerm, selectedCategory, sortBy);

  return (
    <div className="products-page">
      <header className="page-header">
        <h1 className="page-title">🛍️ E-Store Catalog</h1>
        <p className="page-subtitle">Discover our amazing collection of products</p>
      </header>

      <div className="page-container">
        {/* Filters section */}
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          disabled={loading}
          placeholder="Search for products..."
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          disabled={loading}
        />

        <SortBar
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          disabled={loading}
        />

        {/* Results info */}
        {filteredProducts.length > 0 && (
          <div className="results-info">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedCategory && ` in ${selectedCategory}`}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <button className="btn-retry" onClick={retry}>
              Retry
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && <SkeletonGrid count={12} />}

        {/* Products grid/list */}
        {!loading && !error && (
          <ProductGrid products={filteredProducts} viewMode={viewMode} />
        )}
      </div>
    </div>
  );
};

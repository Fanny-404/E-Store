import React from 'react';
import '../styles/CategoryFilter.css';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  disabled?: boolean;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  disabled = false,
}) => {
  return (
    <div className="category-filter">
      <h3 className="filter-title">Categories</h3>
      <div className="category-buttons">
        <button
          className={`category-button ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => onSelectCategory(null)}
          disabled={disabled}
          aria-label="Show all categories"
        >
          🏷️ All Products
        </button>

        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(selectedCategory === category ? null : category)}
            disabled={disabled}
            aria-label={`Filter by ${category}`}
          >
            {getCategoryEmoji(category)} {capitalizeCategory(category)}
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * Get emoji for category
 */
function getCategoryEmoji(category: string): string {
  const emojiMap: { [key: string]: string } = {
    electronics: '📱',
    jewelery: '💍',
    "men's clothing": '👕',
    "women's clothing": '👗',
  };
  return emojiMap[category.toLowerCase()] || '🏷️';
}

/**
 * Capitalize category name
 */
function capitalizeCategory(category: string): string {
  return category
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

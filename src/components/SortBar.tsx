import React from 'react';
import '../styles/SortBar.css';

interface SortBarProps {
  sortBy: 'asc' | 'desc' | 'none';
  onSortChange: (sort: 'asc' | 'desc' | 'none') => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  disabled?: boolean;
}

export const SortBar: React.FC<SortBarProps> = ({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  disabled = false,
}) => {
  return (
    <div className="sort-bar">
      <div className="sort-controls">
        <div className="sort-group">
          <label htmlFor="sort-select">Sort by Price:</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'asc' | 'desc' | 'none')}
            disabled={disabled}
            aria-label="Sort by price"
          >
            <option value="none">No sorting</option>
            <option value="asc">💰 Low to High</option>
            <option value="desc">💸 High to Low</option>
          </select>
        </div>

        <div className="view-mode-group">
          <span className="view-label">View:</span>
          <div className="view-buttons">
            <button
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => onViewModeChange('grid')}
              disabled={disabled}
              aria-label="Grid view"
              title="Grid view"
            >
              ⊞
            </button>
            <button
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => onViewModeChange('list')}
              disabled={disabled}
              aria-label="List view"
              title="List view"
            >
              ≡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

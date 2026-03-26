import React from 'react';
import '../styles/Skeleton.css';

/**
 * Skeleton component for showing loading state
 */
export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`skeleton ${className}`} />
);

/**
 * Product card skeleton loader
 */
export const ProductCardSkeleton: React.FC = () => (
  <div className="product-card-skeleton">
    <Skeleton className="skeleton-image" />
    <div className="skeleton-content">
      <Skeleton className="skeleton-title" />
      <Skeleton className="skeleton-text" />
      <Skeleton className="skeleton-price" />
      <Skeleton className="skeleton-button" />
    </div>
  </div>
);

/**
 * Grid of skeleton loaders
 */
export const SkeletonGrid: React.FC<{ count?: number }> = ({ count = 12 }) => (
  <div className="product-grid">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

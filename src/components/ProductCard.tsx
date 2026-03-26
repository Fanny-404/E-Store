import React, { useState } from 'react';
import { Product, AIDescriptionResponse } from '../types/product';
import { aiService } from '../services/aiService';
import '../styles/ProductCard.css';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const [showAIDescription, setShowAIDescription] = useState(false);
  const [aiDescription, setAIDescription] = useState<AIDescriptionResponse | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [errorAI, setErrorAI] = useState<string | null>(null);

  const handleGenerateAIDescription = async () => {
    if (showAIDescription) {
      setShowAIDescription(false);
      return;
    }

    try {
      setLoadingAI(true);
      setErrorAI(null);
      const description = await aiService.generateDescription(product);
      setAIDescription(description);
      setShowAIDescription(true);
    } catch (error) {
      setErrorAI(error instanceof Error ? error.message : 'Failed to generate description');
    } finally {
      setLoadingAI(false);
    }
  };

  const rating = product.rating?.rate || 0;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22%3EImage not available%3C/text%3E%3C/svg%3E';
          }}
        />
        {rating > 4.0 && <div className="product-badge">⭐ Top Rated</div>}
      </div>

      <div className="product-content">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.title}</h3>

        {!showAIDescription && (
          <p className="product-description">{product.description}</p>
        )}

        {showAIDescription && aiDescription && (
          <div className="ai-description-container">
            <div className="ai-badge">✨ AI Enhanced</div>
            <div className="ai-section">
              <h4>Enhanced Description</h4>
              <p>{aiDescription.description}</p>
            </div>
            <div className="ai-section">
              <h4>Shopping Suggestions</h4>
              <ul className="suggestions-list">
                {aiDescription.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
            <div className="ai-section">
              <h4>Summary</h4>
              <p>{aiDescription.summary}</p>
            </div>
          </div>
        )}

        <div className="product-footer">
          <div className="product-price-rating">
            <span className="product-price">${product.price.toFixed(2)}</span>
            {rating > 0 && (
              <span className="product-rating">
                ⭐ {rating.toFixed(1)} ({product.rating?.count || 0})
              </span>
            )}
          </div>
        </div>

        <div className="product-actions">
          <button
            className="btn btn-primary"
            onClick={() => onViewDetails(product)}
            aria-label={`View details for ${product.title}`}
          >
            View Details
          </button>
          <button
            className={`btn btn-secondary ${loadingAI ? 'loading' : ''}`}
            onClick={handleGenerateAIDescription}
            disabled={loadingAI}
            aria-label="Generate AI description"
            title="Generate AI-enhanced description and suggestions"
          >
            {loadingAI ? '⏳ Loading...' : showAIDescription ? '✕ Close' : '🤖 AI Description'}
          </button>
        </div>

        {errorAI && <div className="error-message">{errorAI}</div>}
      </div>
    </div>
  );
};

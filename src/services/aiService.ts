import { AIDescriptionResponse, Product } from '../types/product';

/**
 * Simulated AI service for generating enhanced product descriptions
 * This is a demonstration of AI integration using pattern matching and templates
 */
export const aiService = {
  /**
   * Generate an enhanced AI description for a product
   * This simulates an AI service by using intelligent text processing
   */
  generateDescription: async (product: Product): Promise<AIDescriptionResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Extract key information from the product
    const title = product.title;
    const price = product.price;
    const category = product.category;
    const originalDescription = product.description;
    const rating = product.rating?.rate || 0;

    // Generate enhanced description based on product details
    const enhancedDescription = generateEnhancedDescription(
      title,
      category,
      originalDescription,
      price,
      rating
    );

    // Generate shopping suggestions
    const suggestions = generateSuggestions(category, price, rating);

    // Generate summary
    const summary = generateSummary(title, price, rating, category);

    return {
      description: enhancedDescription,
      suggestions,
      summary,
    };
  },
};

/**
 * Generate an enhanced, more compelling product description
 */
function generateEnhancedDescription(
  title: string,
  category: string,
  originalDescription: string,
  price: number,
  rating: number
): string {
  const templates: { [key: string]: string[] } = {
    electronics: [
      `Premium ${title}. ${originalDescription} This state-of-the-art device combines cutting-edge technology with exceptional build quality.`,
      `Introducing the ${title} - a revolutionary product designed for tech enthusiasts. ${originalDescription} Experience unparalleled performance and reliability.`,
    ],
    jewelery: [
      `Exquisite ${title}. ${originalDescription} Crafted with meticulous attention to detail, this piece is perfect for any occasion.`,
      `Elegant ${title} featuring sophisticated design. ${originalDescription} A timeless accessory that elevates your personal style.`,
    ],
    "men's clothing": [
      `Stylish ${title}. ${originalDescription} Perfect for the modern man seeking comfort and contemporary fashion.`,
      `The ${title} combines comfort and style. ${originalDescription} Ideal for both casual and professional settings.`,
    ],
    "women's clothing": [
      `Beautiful ${title}. ${originalDescription} Designed with elegance in mind, this piece showcases modern fashion sensibility.`,
      `Stunning ${title} for the fashion-conscious woman. ${originalDescription} Perfect for any wardrobe.`,
    ],
  };

  // Get category-specific template or use generic one
  const categoryTemplates = templates[category.toLowerCase()] || [
    `High-quality ${title}. ${originalDescription} A reliable choice backed by strong customer ratings.`,
  ];

  // Select template based on rating
  const selectedTemplate = rating > 4.2 ? categoryTemplates[0] : categoryTemplates[1] || categoryTemplates[0];

  return selectedTemplate;
}

/**
 * Generate buying suggestions based on product characteristics
 */
function generateSuggestions(category: string, price: number, rating: number): string[] {
  const suggestions: string[] = [];

  // Suggestion 1: Rating-based
  if (rating > 4.5) {
    suggestions.push('⭐ Best seller with excellent customer reviews - highly recommended purchase');
  } else if (rating > 4.0) {
    suggestions.push('✓ Well-reviewed product with consistent quality');
  } else {
    suggestions.push('✓ Solid product choice with good value');
  }

  // Suggestion 2: Price-based
  if (price < 50) {
    suggestions.push('💰 Excellent value for money - budget-friendly option');
  } else if (price < 150) {
    suggestions.push('📊 Mid-range product offering quality at a competitive price');
  } else {
    suggestions.push('💎 Premium product for those seeking top-tier quality');
  }

  // Suggestion 3: Category-based recommendations
  const categoryTips: { [key: string]: string } = {
    electronics: '⚡ Perfect for tech enthusiasts - check compatibility before ordering',
    jewelery: '✨ Great gift option - comes well-packaged for special occasions',
    "men's clothing": '👔 Classic style that pairs well with many outfits',
    "women's clothing": '👗 Versatile piece that works for multiple seasons',
  };

  const tip = categoryTips[category.toLowerCase()];
  if (tip) {
    suggestions.push(tip);
  }

  // Suggestion 4: General recommendation
  suggestions.push('🎯 Consider buying in bulk or looking for bundle deals');

  return suggestions;
}

/**
 * Generate a brief summary of the product
 */
function generateSummary(title: string, price: number, rating: number, category: string): string {
  const ratingText =
    rating > 4.5 ? 'Highly rated' : rating > 4.0 ? 'Well-reviewed' : 'Popular';
  const priceText =
    price < 50 ? 'affordable' : price < 150 ? 'moderately priced' : 'premium-priced';

  return `${ratingText} ${priceText} ${category} product: ${title}. With a rating of ${rating}/5, this item offers excellent quality and value. Ideal for customers looking for reliable, high-quality products in the ${category} category.`;
}

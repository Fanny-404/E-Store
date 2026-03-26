import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategoryFilter } from '../../components/CategoryFilter';

describe('CategoryFilter Component', () => {
  const mockCategories = ['electronics', 'jewelery', "men's clothing"];

  it('should render category buttons', () => {
    const mockOnSelect = jest.fn();
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory={null}
        onSelectCategory={mockOnSelect}
      />
    );

    expect(screen.getByText('🏷️ All Products')).toBeInTheDocument();
    expect(screen.getByText('📱 Electronics')).toBeInTheDocument();
    expect(screen.getByText('💍 Jewelery')).toBeInTheDocument();
  });

  it('should call onSelectCategory when a button is clicked', async () => {
    const mockOnSelect = jest.fn();
    const user = userEvent.setup();

    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory={null}
        onSelectCategory={mockOnSelect}
      />
    );

    const electronicButton = screen.getByRole('button', {
      name: /filter by electronics/i,
    });
    await user.click(electronicButton);

    expect(mockOnSelect).toHaveBeenCalledWith('electronics');
  });

  it('should mark selected category as active', () => {
    const mockOnSelect = jest.fn();
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="electronics"
        onSelectCategory={mockOnSelect}
      />
    );

    const electronicButton = screen.getByRole('button', {
      name: /filter by electronics/i,
    });
    expect(electronicButton).toHaveClass('active');
  });

  it('should disable buttons when disabled prop is true', () => {
    const mockOnSelect = jest.fn();
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory={null}
        onSelectCategory={mockOnSelect}
        disabled={true}
      />
    );

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});

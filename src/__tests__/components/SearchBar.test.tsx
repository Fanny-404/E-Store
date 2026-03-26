import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../../components/SearchBar';

describe('SearchBar Component', () => {
  it('should render search input', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox', { name: /search products/i });
    expect(input).toBeInTheDocument();
  });

  it('should call onChange when typing', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();

    render(<SearchBar value="" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox', { name: /search products/i });
    await user.type(input, 'Laptop');

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('should display clear button when value is provided', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="test" onChange={mockOnChange} />);

    const clearButton = screen.getByRole('button', { name: /clear search/i });
    expect(clearButton).toBeInTheDocument();
  });

  it('should call onChange with empty string when clear button is clicked', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();

    render(<SearchBar value="test" onChange={mockOnChange} />);

    const clearButton = screen.getByRole('button', { name: /clear search/i });
    await user.click(clearButton);

    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  it('should be disabled when disabled prop is true', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} disabled={true} />);

    const input = screen.getByRole('textbox', { name: /search products/i });
    expect(input).toBeDisabled();
  });

  it('should display custom placeholder', () => {
    const mockOnChange = jest.fn();
    const customPlaceholder = 'Custom search text';

    render(
      <SearchBar value="" onChange={mockOnChange} placeholder={customPlaceholder} />
    );

    const input = screen.getByPlaceholderText(customPlaceholder);
    expect(input).toBeInTheDocument();
  });
});

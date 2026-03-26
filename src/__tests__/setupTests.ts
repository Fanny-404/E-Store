import '@testing-library/jest-dom';

/**
 * Mock window.matchMedia
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

/**
 * Suppress fetch API warnings in tests
 */
// In jsdom/testing environment, window is available
Object.defineProperty(window, 'fetch', {
  value: jest.fn(),
  writable: true,
});

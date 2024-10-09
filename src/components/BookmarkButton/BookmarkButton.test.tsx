import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import BookmarkButton from './BookmarkButton';

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('BookmarkButton', () => {
    beforeEach(() => {
      localStorage.clear();
    });
  
    const renderWithRouter = (component: React.ReactElement) => {
      return render(<MemoryRouter>{component}</MemoryRouter>);
    };
  
    it('should render Bookmark button initially', () => {
      renderWithRouter(<BookmarkButton title="Test Movie" />);
      const button = screen.getByRole('button');
      expect(button.textContent).toBe('Bookmark');
    });
  
    it('should toggle bookmark status on click', async () => {
      renderWithRouter(<BookmarkButton title="Test Movie" />);
      const button = screen.getByRole('button');
      
      // Initially not bookmarked
      expect(button.textContent).toBe('Bookmark');
  
      // Click to bookmark
      await userEvent.click(button);
      expect(button.textContent).toBe('Remove Bookmark');
  
      // Click to remove bookmark
      await userEvent.click(button);
      expect(button.textContent).toBe('Bookmark');
    });
  
    it('should remember bookmark status from localStorage', () => {
      localStorage.setItem('bookmarks', JSON.stringify([{ title: 'Test Movie' }]));
  
      renderWithRouter(<BookmarkButton title="Test Movie" />);
      const button = screen.getByRole('button');
  
      // Should be bookmarked based on localStorage
      expect(button.textContent).toBe('Remove Bookmark');
    });
  
    it('should add bookmark to localStorage', async () => {
      renderWithRouter(<BookmarkButton title="New Movie" />);
      const button = screen.getByRole('button');
  
      // Click to bookmark
      await userEvent.click(button);
  
      // Check localStorage
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      expect(bookmarks).toEqual([{ title: 'New Movie' }]);
    });
  
    it('should remove bookmark from localStorage', async () => {
      localStorage.setItem('bookmarks', JSON.stringify([{ title: 'Test Movie' }]));
  
      renderWithRouter(<BookmarkButton title="Test Movie" />);
      const button = screen.getByRole('button');
  
      // Click to remove bookmark
      await userEvent.click(button);
  
      // Check localStorage
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      expect(bookmarks).toEqual([]);
    });
  });
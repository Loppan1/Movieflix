import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { it, expect } from 'vitest';
import Carousal from './Carousal';
import '@testing-library/jest-dom';

const mockMovies = [
  {
    title: 'Inception',
    year: 2010,
    rating: 'PG-13',
    actors: ['Leonardo DiCaprio'],
    genre: 'Sci-Fi',
    synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
    thumbnail: '/assets/inception.jpg',
  },
  {
    title: 'The Dark Knight',
    year: 2008,
    rating: 'PG-13',
    actors: ['Christian Bale'],
    genre: 'Action',
    synopsis: 'When the menace known as the Joker emerges from his mysterious past...',
    thumbnail: '/assets/dark-knight.jpg',
  },
];

it('should navigate to the correct movie detail page on thumbnail click', async () => {
  render(
    <MemoryRouter>
      <Carousal movies={mockMovies} />
    </MemoryRouter>
  );

  const inceptionImages = await waitFor(() => screen.getAllByAltText('Inception'));

 
  const inceptionLink = inceptionImages[0].closest('a');
  
  expect(inceptionLink).toHaveAttribute('href', '/movieview/Inception');
});
it('should render all movies in the carousel', async () => {
  render(
    <MemoryRouter>
      <Carousal movies={mockMovies} />
    </MemoryRouter>
  );

 
  for (const movie of mockMovies) {
    const movieImages = await waitFor(() => screen.getAllByAltText(movie.title));
    expect(movieImages[0]).toBeInTheDocument(); 
  }
});
it('should navigate to the correct movie detail pages for all movies', async () => {
  render(
    <MemoryRouter>
      <Carousal movies={mockMovies} />
    </MemoryRouter>
  );

  for (const movie of mockMovies) {
    // Get all elements with the movie title as the alt text and use the first one
    const movieImages = await waitFor(() => screen.getAllByAltText(movie.title));
    const movieLink = movieImages[0].closest('a'); // Ensure you're selecting the first instance
    expect(movieLink).toHaveAttribute('href', `/movieview/${movie.title}`);
  }
});

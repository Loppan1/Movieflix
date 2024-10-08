import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { it, expect } from 'vitest';
import Carousal from './Carousal';

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

it('should navigate to the correct movie detail page on thumbnail click', () => {
    render(
      <MemoryRouter>
        <Carousal movies={mockMovies} />
      </MemoryRouter>
    );
  
    const inceptionLinks = screen.getAllByText(/inception/i);
    const inceptionLink = inceptionLinks[0].closest('a');  
    expect(inceptionLink).toHaveAttribute('href', '/movieview/Inception');
  });
  


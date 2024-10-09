import { render, screen, waitFor,fireEvent  } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom'; //
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


//all movies

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
// test movie detail 
it('should navigate to the correct movie detail pages for all movies', async () => {
  render(
    <MemoryRouter>
      <Carousal movies={mockMovies} />
    </MemoryRouter>
  );

  for (const movie of mockMovies) {
   
    const movieImages = await waitFor(() => screen.getAllByAltText(movie.title));
    const movieLink = movieImages[0].closest('a'); 
    expect(movieLink).toHaveAttribute('href', `/movieview/${movie.title}`);
  }
});



// Mock component for MovieDetail
function MockMovieDetail() {
  return <div>Mock Movie Detail Page</div>;
}

// Test case for navigation
it('should navigate to the correct movie detail page on thumbnail click', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Carousal movies={mockMovies} />} />
        <Route path="/movieview/:title" element={<MockMovieDetail />} />
      </Routes>
    </MemoryRouter>
  );

  // Simulate a click on the 'Inception' movie thumbnail
  const inceptionImages = screen.getAllByAltText('Inception');
  const inceptionLink = inceptionImages[0].closest('a'); // Get the link for the first occurrence
  
  // Ensure inceptionLink is not null before proceeding
  if (inceptionLink) {
    fireEvent.click(inceptionLink); // Simulate a click
  } else {
    throw new Error('Inception link not found');
  }

  // Verify that we have navigated to the correct movie detail page by checking rendered content
  expect(screen.getByText('Mock Movie Detail Page')).toBeInTheDocument();
});
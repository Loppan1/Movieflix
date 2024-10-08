import { useState } from 'react';
import './categories.css';
import movies from '../assets/movies.json';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import { handleImageError } from '../utils';

interface Movie {
  title: string;
  year: number;
  rating: string;
  actors: string[];
  genre: string;
  synopsis: string;
  thumbnail: string;
  isTrending?: boolean;
}

const categorizeMoviesByGenre = (movies: Movie[]): Map<string, Movie[]> => {
  const genresMap = new Map<string, Movie[]>();

  movies.forEach((movie) => {
    const genres = movie.genre.split(', ');
    genres.forEach((genre) => {
      if (!genresMap.has(genre)) {
        genresMap.set(genre, []);
      }
      genresMap.get(genre)?.push(movie);
    });
  });

  return genresMap;
};

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <article>
      <Link to={`/movieview/${movie.title}`}>
        <div className='movie-card'>
          <img
            src={movie.thumbnail}
            alt={`${movie.title} thumbnail`}
            onError={handleImageError}
          />
          <div className='movie-details'>
            <p>
              <strong>Year:</strong> {movie.year}
            </p>
            <p>
              <strong>Rating:</strong> {movie.rating}
            </p>
          </div>
          <p>{movie.title}</p>
        </div>
      </Link>
    </article>
  );
};

const MovieList = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className='movies-list'>
      {movies.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </div>
  );
};

const BurgerMenu = ({
  genres,
  onSelectGenre,
}: {
  genres: string[];
  onSelectGenre: (genre: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='burger-menu'>
      <button className='burger-button' onClick={toggleMenu}>
        &#9776;
      </button>
      {isOpen && (
        <div className='burger-dropdown'>
          <ul>
            <li onClick={() => onSelectGenre('All')}>All</li>
            {genres.map((genre) => (
              <li key={genre} onClick={() => onSelectGenre(genre)}>
                {genre}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Categories = () => {
  const categorizedMovies = categorizeMoviesByGenre(movies);
  const genres = Array.from(categorizedMovies.keys());
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  const handleSelectGenre = (genre: string) => {
    setSelectedGenre(genre);
  };

  const filteredMovies =
    selectedGenre === 'All'
      ? movies
      : categorizedMovies.get(selectedGenre) || [];

  return (
    <main>
      <NavBar />

      <div className='categories-header'>
        <h1>Categories</h1>
        <BurgerMenu genres={genres} onSelectGenre={handleSelectGenre} />
      </div>

      <h2>{selectedGenre === 'All' ? 'All Movies' : selectedGenre}</h2>

      <div className='movies-container'>
        <MovieList movies={filteredMovies} />
      </div>

      <Footer />
    </main>
  );
};

export default Categories;

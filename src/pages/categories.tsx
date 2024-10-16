import { useState } from 'react';
import './categories.css';
import movies from '../assets/movies.json';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar/NavBar';
import MovieCard from '../components/MovieCard/MovieCard'; // Moved to component for reusability

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

const MovieList = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className='movies-list'>
      {movies.map((movie) => (
        <MovieCard key={movie.title} movie={movie} type='categories' />
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
    <div className="wrapper">
        <NavBar />
        <main className='categories-page'>
          <div className='categories-header'>
            <h1>Categories</h1>
            <BurgerMenu genres={genres} onSelectGenre={handleSelectGenre} />
          </div>

          <h2>{selectedGenre === 'All' ? 'All Movies' : selectedGenre}</h2>

          <div className='movies-container'>
            <MovieList movies={filteredMovies} />
          </div>
        </main>
        <Footer />
    </div>
  );
};

export default Categories;

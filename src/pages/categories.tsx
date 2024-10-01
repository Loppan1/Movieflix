import React, { useState } from 'react';
import './categories.css'; 
import movies from '../assets/movies.json'; 
import SearchBar from '../components/SearchBar/SearchBar'; 
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
interface MovieModalProps {
  movie: {
    title: string;
    year: number;
    rating: string;
    actors: string[];
    genre: string;
    synopsis: string;
    thumbnail: string;
  };
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  return (
    <aside className="modal-backdrop">
      <article className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <header>
          <h2>{movie.title}</h2>
        </header>
        <section>
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Description:</strong> {movie.synopsis}</p>
        </section>
      </article>
    </aside>
  );
};

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <article>
      <div className="movie-card" onClick={openModal}>
        <img src={movie.thumbnail} alt={`${movie.title} thumbnail`} />
        <header>
          <h3>{movie.title}</h3>
        </header>
        <p>{movie.year}</p>
      </div>
      {isModalOpen && <MovieModal movie={movie} onClose={closeModal} />}
    </article>
  );
};

const GenreSection = ({ genre, movies }: { genre: string; movies: Movie[] }) => {
  return (
    <section className="genre-section">
      <header>
        <h2>{genre}</h2>
      </header>
      <div className="movies-list">
        {movies.map((movie) => (
          <MovieCard key={movie.title} movie={movie} />
        ))}
      </div>
    </section>
  );
};

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const categorizedMovies = categorizeMoviesByGenre(movies);

  const filteredMovies = Array.from(categorizedMovies.entries()).reduce((acc, [genre, movies]) => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc.set(genre, filtered);
    }
    return acc;
  }, new Map<string, Movie[]>());

  return (
    <main>
        <NavBar/>
        <SearchBar setSearchQuery={setSearchQuery} />
      <h1>Categories</h1>
      
      <div className="categories-container">
        {Array.from(filteredMovies.keys()).map((genre) => (
          <GenreSection key={genre} genre={genre} movies={filteredMovies.get(genre) || []} />
        ))}
      </div>
      <Footer />
    </main>
  );
};

export default Categories;

import './categories.css'; 
import movies from '../assets/movies.json'; 
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";

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
      <div className="movie-card">
        <img src={movie.thumbnail} alt={`${movie.title} thumbnail`} />
        <div className="movie-details">
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
        </div>
      </div>
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
  const categorizedMovies = categorizeMoviesByGenre(movies);

  return (
    <main>
      <NavBar />
      <h1>Categories</h1>
      <div className="categories-container">
        {Array.from(categorizedMovies.keys()).map((genre) => (
          <GenreSection key={genre} genre={genre} movies={categorizedMovies.get(genre) || []} />
        ))}
      </div>
      <Footer />
    </main>
  );
};

export default Categories;

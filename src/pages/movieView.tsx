import { useParams } from 'react-router';
import NavBar from '../components/NavBar/NavBar';
import movies from '../assets/movies.json';
import './movieView.css';
import BookmarkButton from '../components/BookmarkButton/BookmarkButton';
import Footer from '../components/Footer/Footer';
import { handleImageError } from '../utils/handleImageError';

function movieView() {
  const { movieid } = useParams<{ movieid: string }>();

  const movie = movies.find((m) => m.title === movieid);

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <div className='wrapper'>
      <NavBar />
        <main className='media-view-page'>
          <div className='movie-view-section'>
            <h1>{movie.title}</h1>
            <aside className='movieview-container'>
              <img
                className='movie-thumbnail'
                src={movie.thumbnail}
                alt='movie image'
                onError={handleImageError}
              />
              <div className='movie-details-container'>
                <p>
                  <strong>Release</strong> {movie.year}
                </p>
                <p>
                  <strong>Genre</strong> {movie.genre}
                </p>
                <p>
                  <strong>Actors</strong> {movie.actors.join(', ')}
                </p>
                <p>
                  <strong>Synopsis</strong> {movie.synopsis}
                </p>
                <div className='button-container'>
                  <BookmarkButton title={movie.title} />
                </div>
              </div>
            </aside>
          </div>
        </main>
      <Footer />
    </div>
  );
}

export default movieView;

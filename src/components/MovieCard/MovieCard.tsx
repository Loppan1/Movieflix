import { Link } from 'react-router-dom';
import { handleImageError } from '../../utils/handleImageError';
import './MovieCard.css'
import BookmarkButton from '../BookmarkButton/BookmarkButton';

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

interface MovieCardProps {
    movie: Movie;
    type: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, type }) => {

    let cardClass = type;

    return (
        <article>
          <BookmarkButton title={movie.title} type='picture'/>
          <Link to={`/movieview/${movie.title}`} className='movie__link'>
            <div className={`movie-card ${cardClass}`}>
              <img
                src={movie.thumbnail}
                alt={`${movie.title} thumbnail`}
                onError={handleImageError}
              />
              <div className='movie-details'>
                <p>{movie.year}</p>
                <p>{movie.rating}</p>
              </div>
            </div>
          </Link>
        </article>
      );
}

  export default MovieCard;
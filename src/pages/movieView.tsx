import { useParams } from 'react-router';
import NavBar from '../components/NavBar/NavBar';
import movies from '../assets/movies.json'
import './movieView.css';
import BookmarkButton from '../components/BookmarkButton/BookmarkButton';

function movieView() {
  const { movieid } = useParams<{ movieid: string}>();

  const movie = movies.find((m) => m.title === movieid );

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <>
      <section className='media-view-page'>
        <NavBar />
        <div className='movie-view-container'>
          <h1>Movie View</h1>
          <h1>{movie.title}</h1>
          <BookmarkButton title={movie.title}/>
        </div>
      </section>
    </>
  );
}

export default movieView;

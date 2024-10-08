import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/NavBar/NavBar';
import Button from '../components/Button/Button';
import movies from '../assets/movies.json';
import './bookmarks.css';
import { handleImageError } from '../utils';

interface Movie {
  title: string;
  year: string;
  rating: string;
  thumbnail: string;
}

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Movie[]>([]);

  useEffect(() => {
    // Fetch bookmarks from local storage
    const storedBookmarks = JSON.parse(
      localStorage.getItem('bookmarks') || '[]'
    );
    const filteredBookmarks = storedBookmarks
      .map((storedBookmark: { title: string }) =>
        movies.find((movie) => movie.title === storedBookmark.title)
      )
      .filter((movie: any): movie is Movie => movie !== undefined);
    setBookmarks(filteredBookmarks);
  }, []);

  const handleRemoveBookmark = (title: string) => {
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark.title !== title
    );
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className='bookmarks-page'>
      <NavBar />
      <main className='bookmarks-page__main'>
        {bookmarks.length === 0 ? (
          <p>No movies bookmarked</p>
        ) : (
          bookmarks.map((bookmark) => (
            <section className='bookmarks-card' key={bookmark.title}>
              <Link
                to={`/movieview/${bookmark.title}`}
                className='bookmarks-card__link'
              >
                <img
                  src={bookmark.thumbnail}
                  className='bookmarks-card__img'
                  onError={handleImageError}
                />
                <article className='bookmarks-card__text'>
                  <h2 className='bookmarks-card__title'>{bookmark.title}</h2>
                  <div className='bookmarks-card__pair'>
                    <h3 className='bookmarks-card__release'>{bookmark.year}</h3>
                    <h3 className='bookmarks-card__rating'>
                      {bookmark.rating}
                    </h3>
                  </div>
                </article>
              </Link>
              <Button onClick={() => handleRemoveBookmark(bookmark.title)}>
                Remove
              </Button>
            </section>
          ))
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Bookmarks;

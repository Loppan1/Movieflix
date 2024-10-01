import NavBar from '../components/NavBar/NavBar';
import './movieView.css';

function movieView() {
  return (
    <>
      <section className='media-view-page'>
        <NavBar />
        <div className='movie-view-container'>
          <h1>Movie View</h1>
        </div>
      </section>
    </>
  );
}

export default movieView;

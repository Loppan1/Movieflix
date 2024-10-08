import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Carousal.css";
import { Link } from "react-router-dom";

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

interface CarousalProps {
  movies: Movie[];
}

function Carousal({ movies }: CarousalProps) {
  return (
    <div className="carousel-container">
      <Carousel
        showArrows={true}
        autoPlay={false}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        centerMode={true}
        centerSlidePercentage={33.33}
        showStatus={false}
      >
        {movies.map((movie, i) => (
          <Link to={`/movieview/${movie.title}`} key={i}>
            <div className="movie_container" key={movie.title}>
              <img src={movie.thumbnail} alt={movie.title} />
              <div className="legend_container">
                <p>{movie.title}</p>
                <p>{movie.year}</p>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
}

export default Carousal;

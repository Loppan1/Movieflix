
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import moviesData from "../../assets/movies.json"; // Adjust the path as necessary
import "./recommend.css"; 

function recommend() {
  return (
    <div className="carousel-container">
      <h2>Recommended for You</h2>
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
        {moviesData.map((movie, index) => (
          <div key={index} className="movie_container">
            <img src={movie.thumbnail} alt={movie.title} />
            <div className="legend_container">
              <p>{movie.title}</p>
              <p>{movie.year}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default recommend;

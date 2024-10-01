import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import logo from "../../assets/logo.png";
import "./Carousal.css";

function Carousal() {
  return (
    <div className="carousel-container">
      <Carousel
        showArrows={true}
        autoPlay={false}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        centerMode={true} // Enable center mode
        centerSlidePercentage={33.33}
        showStatus={false}
      >
        <div className="movie_container">
          <img src={logo} />
          <div className="legend_container">
            <p>movie</p>
            <p>year</p>
          </div>
        </div>
        <div className="movie_container">
          <img src={logo} />
          <div className="legend_container">
            <p>movie</p>
            <p>year</p>
          </div>
        </div>

        <div className="movie_container">
          <img src={logo} />
          <div className="legend_container">
            <p>movie</p>
            <p>year</p>
          </div>
        </div>

        <div className="movie_container">
          <img src={logo} />
          <div className="legend_container">
            <p>movie</p>
            <p>year</p>
          </div>
        </div>

        <div className="movie_container">
          <img src={logo} />
          <div className="legend_container">
            <p>movie</p>
            <p>year</p>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default Carousal;

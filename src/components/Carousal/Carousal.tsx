import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './Carousal.css';
import { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard'; // Used same component as Categories

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
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(33.33); // Default for desktop

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Set centerSlidePercentage based on the window width
      if (window.innerWidth <= 768) {
        setCenterSlidePercentage(100); // Mobile view
      } else {
        setCenterSlidePercentage(33.33); // Desktop view
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  return (
    <div className="carousel-container">
      <Carousel
        showArrows={true}
        autoPlay={false}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        centerMode={true}
        centerSlidePercentage={centerSlidePercentage}
        showStatus={false}
      >
      {movies.map((movie) => (
      <MovieCard 
        key={movie.title} 
        movie={movie} 
        type="carousal"
        />
        ))}
      </Carousel>
    </div>
  );
}

export default Carousal;

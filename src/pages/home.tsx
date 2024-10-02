import Carousal from "../components/Carousal/Carousal";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import RecommendedCarousel from "../components/Recommended Carousal/recommend";
import "./home.css";
import movies from "../assets/movies.json";
import { useEffect, useState } from "react";

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

const Home = () => {
  const [trending, setTrending] = useState<Movie[]>([]);

  useEffect(() => {
    const trendingMovies: Movie[] = movies.filter(
      (movie) => movie.isTrending === true
    );
    setTrending(trendingMovies);
  }, []);

  return (
    <>
      <section className="home-page">
        <NavBar />
        <main className="home-page__main">
          <h1>Trending</h1>
        </main>
        <Carousal movies={trending} />

        <Footer />
      </section>
    </>
  );
};

export default Home;

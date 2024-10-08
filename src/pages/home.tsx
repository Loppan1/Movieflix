import Carousal from "../components/Carousal/Carousal";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
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
  const [recommended, setRecommended] = useState<Movie[]>([]);

  useEffect(() => {
    const trendingMovies: Movie[] = movies.filter(
      (movie) => movie.isTrending === true
    );
    setTrending(trendingMovies);
    const recommendedMovies: Movie[] = movies.filter(
      (movie) => movie.isTrending !== true
    ).slice(0, 5); 

    setRecommended(recommendedMovies);
  }, []);

  return (
    <div className="wrapper">
      <NavBar />
        <main className="home-page">
            <h1>Trending</h1>
            <Carousal movies={trending} />
            <h1>Recommended for You</h1>
            <Carousal movies={recommended} />
        </main>
      <Footer />
    </div>
  );
};

export default Home;

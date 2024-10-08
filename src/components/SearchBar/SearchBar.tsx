import { Search } from "lucide-react";
import "./SearchBar.css";
import React from "react";
import movies from "../../assets/movies.json";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";

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

function SearchBar() {
  const [value, setValue] = useState<string>("");
  const [searchedMovies, setSearchedMovies] = React.useState<Movie[]>([]);
  const navigate = useNavigate();

  const fuse = new Fuse(movies, {
    keys: ["title", "genre", "actors"],
    includeScore: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (value.length > 0) {
      // Perform the fuzzy search
      const results = fuse.search(value);
      const matchedMovies = results.map((result) => result.item);
      setSearchedMovies(matchedMovies);
    } else {
      setSearchedMovies([]);
    }
  }, [value, fuse]);

  return (
    <form className="searchbar">
      <div className="searchbar-container">
        <Search size="16" className="searchbar-icon" />
        <input
          className="searchbar-container__input"
          type="search"
          placeholder="Search...."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </div>
      {searchedMovies.length === 0 && value.length > 0 ? (
        <div>No movies found</div>
      ) : (
        searchedMovies.map((movie) => (
          <div
            className="search_suggestion"
            key={movie.title}
            onClick={() => navigate(`/movieview/${movie.title}`)}
          >
            {movie.title}
          </div>
        ))
      )}
    </form>
  );
}

export default SearchBar;

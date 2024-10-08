import { Search } from 'lucide-react';
import './SearchBar.css';
import React from 'react';
import movies from "../../assets/movies.json"
import {useEffect, useState} from 'react';

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
  const [value, setValue] = useState<string>('');
  const [searchedMovies, setSearchedMovies] = React.useState<Movie[]>([]);
  useEffect (() =>{
    if (value.length>0){
   const searchResult = movies.filter((movie)=>movie.title.toLowerCase().includes(value.toLowerCase())
   )
   setSearchedMovies(searchResult);
    }
    else {
      setSearchedMovies([]);
    }
  },[value])
  return (
    <form className='searchbar'>
      <div className='searchbar-container'>
        <Search size='16' className='searchbar-icon' />
        <input
          className='searchbar-container__input'
          type='search'
          placeholder='Search....'
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </div>
      {value && searchedMovies.length > 0 && (
        <div className='searchbar-results'>
          {searchedMovies.map((movie) => (
            <div key={movie.title}> {/* Add a unique key for each movie */}
              {movie.title}
            </div>
          ))}
        </div>
      )}
    </form>
  );
}

export default SearchBar;

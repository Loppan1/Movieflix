import { Search } from 'lucide-react';
import './SearchBar.css';
import React from 'react';

function SearchBar() {
  const [value, setValue] = React.useState('');
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
    </form>
  );
}

export default SearchBar;

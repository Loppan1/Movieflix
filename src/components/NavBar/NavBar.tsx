import Button from '../Button/Button';
import SearchBar from '../SearchBar/SearchBar';
import './NavBar.css';
import Logo from '../../assets/logo.png';

const NavBar = () => {
  return (
    <nav className='nav-bar'>
      <div className='nav-bar__logo'>
        <img src={Logo} alt='MovieFlixLogo' />
      </div>
      <div className='nav-bar__menu'>
        <Button to='/'>Home</Button>
        <Button to='/categories'>Categories</Button>
        <Button to='/bookmarks'>Bookmarks</Button>
        <Button to='/movieview/:movieid'>MovieView"temp"</Button>
      </div>
      <div>
        <SearchBar />
      </div>
    </nav>
  );
};

export default NavBar;

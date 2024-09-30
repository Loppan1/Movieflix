import Button from '../components/Button/Button';
import SearchBar from '../components/SearchBar/SearchBar';

function movieView() {
  return (
    <div>
      <Button>Home</Button>
      <Button>Bookmark</Button>
      <SearchBar />
    </div>
  );
}

export default movieView;

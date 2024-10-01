import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import './home.css';
const Home = () => {
  return (
    <>
      <section className='home-page'>
        <NavBar />
        <div className='home-page__main'>
          <h1>Home</h1>{' '}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;

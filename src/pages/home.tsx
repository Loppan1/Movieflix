import Carousal from "../components/Carousal/Carousal";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import "./home.css";
const Home = () => {
  return (
    <>
      <section className="home-page">
        <NavBar />
        <main className="home-page__main">
          <h1>Home</h1>
        </main>
        <Carousal />

        <Footer />
      </section>
    </>
  );
};

export default Home;

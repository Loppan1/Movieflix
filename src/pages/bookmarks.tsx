import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import logo from "../assets/logo.png" 
import "./bookmarks.css"
import Button from "../components/Button/Button";

const Bookmarks = () => {

    return (
        <div className="bookmarks-page">
            <NavBar />
            <main className="bookmarks-page__main">
                <section className="bookmarks-card">
                    <img src={logo} className="bookmarks-card__img" />
                    <article className="bookmarks-card__text">
                        <h2 className="bookmarks-card__title">Title</h2>
                        <div className="bookmarks-card__pair">
                            <h3 className="bookmarks-card__release">2024</h3>
                            <h3 className="bookmarks-card__rating">PG-13</h3>
                        </div>
                    </article>
                    <Button to="/">Remove</Button>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Bookmarks;
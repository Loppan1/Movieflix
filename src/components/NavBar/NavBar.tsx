import { Link } from "react-router-dom"

const NavBar = () => {

    return (
        <div className="nav-bar">
            <Link to="/"><h3>Home</h3></Link>
            <Link to="/categories"><h3>Categories</h3></Link>
            <Link to="/bookmarks"><h3>Bookmarks</h3></Link>
        </div>
    )
}

export default NavBar;
import { Link } from 'react-router-dom'

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>My Blog</h1>
            <div className="links">
        <Link to="/">Home</Link>
        <Link
          to="/new"
          style={{
            backgroundColor: "#FFDBC3",
            borderRadius: "8px",
          }}
        >
          New Blog
        </Link>
      </div>
        </nav>
     );
}
 
export default Navbar;

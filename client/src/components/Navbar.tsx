import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>NovaHaven</h1>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/history">History</Link>
        <Link to="/magic-tech">Magic & Tech</Link>
        <Link to="/characters">Characters</Link>
        <Link to="/comic-book">Comic Book</Link>
        <Link to="/forum">Forum</Link>
      </div>
    </nav>
  );
}

export default Navbar;
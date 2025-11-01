import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUser } from "../features/userDetailSlice";

const Navbar = () => {
  const { loading, users } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleNavLinkClick = () => {
    if (!isNavCollapsed) {
      setIsNavCollapsed(true);
    }
  };

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData, dispatch]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold fs-3">
          Reduxᵗᵏ
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavToggle}
          aria-expanded={!isNavCollapsed}
          aria-controls="navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${
            !isNavCollapsed ? "show" : ""
          }`}
          id="navbarContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/create"
                className="nav-link"
                onClick={handleNavLinkClick}
              >
                <i className="bi bi-plus-circle me-1"></i>
                Create User
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={handleNavLinkClick}>
                <i className="bi bi-list-ul me-1"></i>
                All Users
                <span className="badge bg-light text-primary ms-2">
                  {loading ? "..." : users.length}
                </span>
              </Link>
            </li>
          </ul>

          <div className="d-flex w-100 w-md-50 mt-2 mt-lg-0">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search users..."
              aria-label="Search"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

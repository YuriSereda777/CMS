import { FaBars, FaRegWindowMinimize } from "react-icons/fa";
import "./MainNavigation.css";
import NavbarLink from "./NavbarLink";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../store/slices/userAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { guestNavLinks, userNavLinks } from "../../data/lists";

const MainNavigation = () => {
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const linkStyles = {
    height: showLinks
      ? `${linksRef.current.getBoundingClientRect().height}px`
      : "0px",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  const user = useSelector(selectUser);

  return (
    <nav className="grad">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/" className="name">
            CMS
          </Link>
          <button className="nav-toggle" onClick={toggleLinks}>
            {showLinks ? <FaRegWindowMinimize /> : <FaBars />}
          </button>
        </div>
        <div
          className="links-container"
          ref={linksContainerRef}
          style={linkStyles}
        >
          <ul className="links" ref={linksRef}>
            {user
              ? userNavLinks.map((navLink, index) => (
                  <NavbarLink
                    key={index}
                    path={navLink.path}
                    text={navLink.text}
                  />
                ))
              : guestNavLinks.map((navLink, index) => (
                  <NavbarLink
                    key={index}
                    path={navLink.path}
                    text={navLink.text}
                  />
                ))}
            {user && (
              <li>
                <a onClick={logoutHandler} style={{ cursor: "pointer" }}>
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;

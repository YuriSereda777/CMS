import { FaBars, FaRegWindowMinimize } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { guestNavLinks, userNavLinks } from "../data/lists";
import NavbarLink from "../components/Navbar/NavbarLink";
import { logout, selectUser } from "../store/slices/userAuthSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="absolute pb-5 z-[50] w-full px-10 sm:px-16 md:px-28 lg:px-40 xl:px-60 py-8 flex flex-row items-center justify-between">
      <Link to="/" className="text-4xl text-white">
        CMS
      </Link>
      {showLinks && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleLinks}
        />
      )}

      <div
        className={`fixed lg:static top-0 left-0 h-screen lg:h-fit bg-white lg:bg-transparent text-black lg:text-gray-200 shadow-lg lg:shadow-none transition-all duration-500 ease-in-out z-40 ${
          showLinks ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <ul className="pt-20 lg:pt-0 px-6 lg:px-0 flex flex-col lg:flex-row gap-1.5 lg:gap-4 text-xl lg:text-2xl">
          {user
            ? userNavLinks.map((navLink, index) => (
                <NavbarLink
                  key={index}
                  path={navLink.path}
                  text={navLink.text}
                  setShowLinks={setShowLinks}
                />
              ))
            : guestNavLinks.map((navLink, index) => (
                <NavbarLink
                  key={index}
                  path={navLink.path}
                  text={navLink.text}
                  setShowLinks={setShowLinks}
                />
              ))}
          {user && (
            <li
              className={`cursor-pointer ${showLinks && "text-gray-400"}`}
              onClick={logoutHandler}
            >
              Logout
            </li>
          )}
        </ul>
      </div>

      <button
        className="lg:hidden text-xl text-gray-200 transition duration-500 hover:text-white"
        onClick={toggleLinks}
      >
        {showLinks ? <FaRegWindowMinimize /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Navbar;

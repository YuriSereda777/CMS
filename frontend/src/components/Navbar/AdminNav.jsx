import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../../store/slices/userAuthSlice";
import { adminMenu } from "../../data/lists";
import adminPic from "../../imgs/admin.png";
import "./AdminNav.css";
import { Spin as Hamburger } from "hamburger-react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
const Sidebar = (props) => {
  const user = useSelector(selectUser);
  const adminName = `${user.firstName} ${user.lastName}`;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  return (
    <div className={props.menuIsOpened ? "sidebar sidebar-opened" : "sidebar"}>
      <div className="absolute top-10 right-5">
        <Hamburger
          toggled={props.menuIsOpened}
          toggle={props.setMenuIsOpened}
          size={22}
        />
      </div>
      <h1>Admin Panel</h1>
      <div className="sidebar-header">
        <div className="admin d-flex align-items-center">
          <div className="admin-info d-flex justify-content-center m-auto">
            <div className="admin-pic m-auto">
              <img src={adminPic} alt="Admin" />
            </div>
            <div className={"d-flex align-items-center pe-0"}>
              <div>
                <p className="admin-name mb-2">{adminName}</p>
                <p className="admin-role">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul>
        {adminMenu.map((item, index) => (
          <li key={index}>
            <NavLink to={item.path} className="link d-flex align-items-center">
              {item.icon}
              <span className="d-inline-block">{item.name}</span>
            </NavLink>
          </li>
        ))}

        <li
          className="mt-1"
          style={{ cursor: "pointer" }}
          onClick={logoutHandler}
        >
          <a className="link d-flex align-items-center">
           <FaArrowUpRightFromSquare />
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import {
  Outlet,
  NavLink,
} from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineQueryStats } from "react-icons/md";
import { FaCar } from "react-icons/fa";

export default function Nav() {
  return (
    <>
      <div id="sidebar">
        <h1><MdOutlineQueryStats className="icon" /> Car Market Analytics</h1>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active" : undefined
                }
              >
                <RxDashboard className="icon" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/highlighted-cars"
                className={({ isActive }) =>
                  isActive ? "active" : undefined
                }
              >
                <FaCar className="icon" />
                Highlighted Cars
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
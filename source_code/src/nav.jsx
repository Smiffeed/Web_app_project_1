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
                to="/car-market-analysis"
                className={({ isActive }) =>
                  isActive ? "active" : undefined
                }
                end // Ensure only exact match for root path
              >
                <RxDashboard className="icon" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/car-market-analysis/highlighted-cars" // Nested path
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
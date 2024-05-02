import React from "react";
import { NavLink } from "react-router-dom";

function SideNav() {
  return (
    <div className="NavMenu">
      <div className="nav-links">
        <div>
          <NavLink
            to="/todos"
            className={({ isActive, isPending, isTransitioning }) =>
              (isPending || isTransitioning
                ? "pending"
                : isActive
                ? "active"
                : "") + " nav-link-single"
            }
          >
            TODOS
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/assignees"
            className={({ isActive, isPending, isTransitioning }) =>
              (isPending || isTransitioning
                ? "pending"
                : isActive
                ? "active"
                : "") + " nav-link-single"
            }
          >
            ASSIGNEES
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default SideNav;

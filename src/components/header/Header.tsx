import { FC } from "react";
import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";

import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaBook } from "@react-icons/all-files/fa/FaBook";

type HeaderProps = {
  children: React.ReactNode;
};

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <div className={classes.header}>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              style={{ width: "8rem" }}
              end
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaHome style={{ marginRight: "0.3rem" }} />{" "}
                <span>{"Home"}</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/logs"}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              style={{ width: "8rem" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaBook style={{ marginRight: "0.3rem" }} />{" "}
                <span>{"Logs"}</span>
              </div>
            </NavLink>
          </li>
          <li></li>
        </ul>
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Header;

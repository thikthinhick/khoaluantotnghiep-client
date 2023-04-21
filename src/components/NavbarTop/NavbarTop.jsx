import React from "react";
import { BoxArrowLeft } from "react-bootstrap-icons";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import House from "../../assets/images/house.png";
import profile from "../../assets/images/user.webp";
import { useStore } from "../../store/AppProvider";
import "./NavbarTop.css";
import Notification from "./Notification";
import Searchbar from "./Searchbar";
function Navbar() {
  const { user, signout } = useStore();
  return (
    <nav
      id="navbar-container"
      className="sb-topnav navbar navbar-expand navbar-dark bg-dark px-3"
    >
      <Link
        to="/"
        className="d-flex align-items-end mx-5"
        style={{ textDecoration: "none" }}
      >
        <img style={{ height: "30px", width: "30px" }} src={House} />
        <span
          style={{
            color: "white",
            fontSize: "18px",
            marginLeft: "4px",
            lineHeight: "18px",
          }}
        >
          HOUSE
          <p
            style={{
              fontSize: "14px",
              lineHeight: "14px",
              color: "var(--yellow-color)",
            }}
          >
            POWER
          </p>
        </span>
      </Link>
      <Searchbar />
      <Notification />
      <div className="d-flex align-items-center">
        <img
          className="image-profile"
          src={user ? user.value.thumbnail : profile}
        />
        <span
          className="mx-2"
          style={{ color: "white", textTransform: "capitalize" }}
        >
          {user.value.username}
        </span>
      </div>

      <NavDropdown id="collasible-nav-dropdown" style={{ color: "white" }}>
        <NavDropdown.Item
          className="d-flex align-items-center"
          onClick={() => signout()}
        >
          <BoxArrowLeft />
          &ensp;Đăng xuất
        </NavDropdown.Item>
      </NavDropdown>
    </nav>
  );
}

export default Navbar;

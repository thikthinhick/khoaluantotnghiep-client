import React from "react";
import { Gear, BoxArrowLeft, Person, BellFill } from "react-bootstrap-icons";
import Notification from "./Notification";
import House from "../../assets/images/house.png";
import "./NavbarTop.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useStore } from "../../store/AppProvider";
import profile from "../../assets/images/user.webp";
import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";
function Navbar() {
  const { user } = useStore();
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
          src={user.value.thumbnail ? user.value.thumbnail : profile}
        />
        <span
          className="mx-2"
          style={{ color: "white", textTransform: "capitalize" }}
        >
          {user.value.username}
        </span>
      </div>

      <NavDropdown id="collasible-nav-dropdown" style={{ color: "white" }}>
        <NavDropdown.Item className="d-flex align-items-center">
          <Person /> &ensp;Trang cá nhân
        </NavDropdown.Item>

        <NavDropdown.Divider />
        <NavDropdown.Item className="d-flex align-items-center">
          <BoxArrowLeft />
          &ensp;Đăng xuất
        </NavDropdown.Item>
      </NavDropdown>
    </nav>
  );
}

export default Navbar;

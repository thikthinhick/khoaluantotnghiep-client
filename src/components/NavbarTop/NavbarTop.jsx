import React from "react";
import {
  Search,
  Gear,
  BoxArrowLeft,
  Person,
  BellFill,
} from "react-bootstrap-icons";
import House from "../../assets/images/house.png";
import "./NavbarTop.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useStore } from "../../store/AppProvider";
import profile from "../../assets/images/user.webp";
function Navbar() {
  const { user } = useStore();
  return (
    <nav
      id="navbar-container"
      className="sb-topnav navbar navbar-expand navbar-dark bg-dark px-3"
    >
      <div className="d-flex align-items-end mx-5">
        <img style={{ height: "30px", width: "30px" }} src={House} />
        <span
          style={{
            color: "white",
            fontSize: "18px",
            marginLeft: "4px",
            lineHeight: "18px",
          }}
        >
          HOUSE<p style={{ fontSize: "14px", lineHeight: "14px" }}>POWER</p>
        </span>
      </div>
      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Tìm kiếm..."
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />
          <button
            className="btn btn-primary"
            id="btnNavbarSearch"
            type="button"
          >
            <Search size={20} color={"white"} />
          </button>
        </div>
      </form>
      <div className="notification">
        <BellFill color="white" size={20} />
      </div>
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
          <Person /> &ensp;Profile
        </NavDropdown.Item>
        <NavDropdown.Item className="d-flex align-items-center">
          <Gear /> &ensp;Cài đặt
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

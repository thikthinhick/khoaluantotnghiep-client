import React from "react";
import { Search, Gear, BoxArrowLeft, Person } from "react-bootstrap-icons";
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
      <span style={{ color: "white", fontSize: "20px" }}>
        QUẢN LÝ ĐIỆN NĂNG
      </span>
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

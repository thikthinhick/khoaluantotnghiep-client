import React from "react";
import {
  HouseDoor,
  LayoutSidebar,
  BarChart,
  Lightbulb,
  Gear,
  QuestionCircle,
} from "react-bootstrap-icons";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavbarLeft.css";
function NavbarLeft() {
  return (
    <div className="px-0 col-xl-2 bg-dark navbarleft-container">
      <div className="d-flex flex-column align-items-center align-items-sm-start pt-2 text-white min-vh-100">
        <a
          href="/"
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="d-none d-sm-inline">QUẢN LÝ ĐIỆN NĂNG</span>
        </a>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
          style={{
            marginTop: "18px",
            width: "100%",
            display: "flex",

            flex: 1,
          }}
        >
          <li className="py-3 active">
            <NavDropdown.Item className="navbar-left-item" href="#">
              <HouseDoor size={20} color={"white"} />
              <h5 className="ms-2 d-none d-sm-inline">TRANG CHỦ</h5>
            </NavDropdown.Item>
          </li>
          <li className="py-3">
            <NavDropdown.Item className="navbar-left-item" href="#">
              <LayoutSidebar size={20} color={"white"} />
              <h5 className="ms-2 d-none d-sm-inline">QUẢN LÝ PHÒNG</h5>
            </NavDropdown.Item>
          </li>
          <li className="py-3">
            <NavDropdown.Item className="navbar-left-item" href="#">
              <BarChart size={20} color={"white"} />
              <h5 className="ms-2 d-none d-sm-inline">THỐNG KÊ</h5>
            </NavDropdown.Item>
          </li>
          <li className="py-3">
            <NavDropdown.Item className="navbar-left-item" href="#">
              <Lightbulb size={20} color={"white"} />
              <h5 className="ms-2 d-none d-sm-inline">GIẢI PHÁP</h5>
            </NavDropdown.Item>
          </li>
          <li className="py-3">
            <NavDropdown.Item className="navbar-left-item" href="#">
              <Gear size={20} color={"white"} />
              <h5 className="ms-2 d-none d-sm-inline">CÀI ĐẶT</h5>
            </NavDropdown.Item>
          </li>
          <li style={{ flex: 1 }}></li>
          <li className="py-3">
            <NavDropdown.Item className="navbar-left-item" href="#">
              <QuestionCircle size={20} color={"white"} />
              <h5 className="ms-2 d-none d-sm-inline">GIỚI THIỆU</h5>
            </NavDropdown.Item>
          </li>
          <br></br>
        </ul>
      </div>
    </div>
  );
}

export default NavbarLeft;

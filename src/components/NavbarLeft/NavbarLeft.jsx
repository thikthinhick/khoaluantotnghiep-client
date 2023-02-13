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
    <div className="col-auto col-xl-2 px-0 bg-dark navbarleft-container navbar-left">
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
          style={{ width: "100%" }}
        >
          <li className="py-3 item active">
            <NavDropdown.Item href="#">
              <HouseDoor size={20} color={"white"} />
              <span className="ms-2 d-none d-sm-inline">TRANG CHỦ</span>
            </NavDropdown.Item>
          </li>
          <li className="py-3">
            <NavDropdown.Item href="#">
              <LayoutSidebar size={20} color={"white"} />
              <span className="ms-2 d-none d-sm-inline">QUẢN LÝ PHÒNG</span>
            </NavDropdown.Item>
          </li>
          <li className="py-3">
            <NavDropdown.Item href="#">
              <BarChart size={20} color={"white"} />
              <span className="ms-2 d-none d-sm-inline">THỐNG KÊ</span>
            </NavDropdown.Item>
          </li>
          <li className="py-3">
            <NavDropdown.Item href="#">
              <Lightbulb size={20} color={"white"} />
              <span className="ms-2 d-none d-sm-inline">GIẢI PHÁP</span>
            </NavDropdown.Item>
          </li>
          <li className="py-3">
            <NavDropdown.Item href="#">
              <Gear size={20} color={"white"} />
              <span className="ms-2 d-none d-sm-inline">CÀI ĐẶT</span>
            </NavDropdown.Item>
          </li>
          <li className="py-3">
            <NavDropdown.Item href="#">
              <QuestionCircle size={20} color={"white"} />
              <span className="ms-2 d-none d-sm-inline">GIỚI THIỆU</span>
            </NavDropdown.Item>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
}

export default NavbarLeft;

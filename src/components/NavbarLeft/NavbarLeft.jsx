import React from "react";
import {
  HouseDoor,
  LayoutSidebar,
  BarChart,
  Diagram3Fill,
  Gear,
  QuestionCircle,
} from "react-bootstrap-icons";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import "./NavbarLeft.css";
function NavbarLeft() {
  const menuItem = [
    {
      path: "/",
      name: "Trang chủ",
      icon: <HouseDoor />,
    },
    {
      path: "/room",
      name: "Quản lý phòng",
      icon: <Diagram3Fill />,
    },
    {
      path: "/statistic",
      name: "Thống kê",
      icon: <BarChart />,
    },
    {
      path: "/setting",
      name: "Cài đặt",
      icon: <Gear />,
    },
    {
      path: "/about",
      name: "Thông tin thêm",
      icon: <QuestionCircle />,
    },
  ];
  return (
    <div className="col-xl-2 bg-dark navbarleft-container">
      <div className="d-flex flex-column align-items-center align-items-sm-start text-white min-vh-100">
        <ul
          className="flex-column align-items-center align-items-sm-start"
          id="menu"
          style={{
            width: "100%",
            display: "flex",
            flex: 1,
          }}
        >
          {menuItem.map((element, index) => (
            <NavLink
              className="link-item"
              to={element.path}
              key={index}
              activeClassName="active"
            >
              <div className="navbar-left-icon">{element.icon}</div>
              <div className="navbar-left-name">{element.name}</div>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NavbarLeft;

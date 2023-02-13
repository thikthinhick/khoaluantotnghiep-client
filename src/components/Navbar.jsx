import React from "react";
import { Outlet } from "react-router-dom";
import NavbarLeft from "./NavbarLeft/NavbarLeft";
import NavbarTop from "./NavbarTop/NavbarTop";
function Navbar() {
  return (
    <React.Fragment>
      <NavbarTop />
      <div id="layoutSidenav">
        <div className="container-fluid p-0">
          <div className="d-flex mx-0">
            <NavbarLeft />
            <div style={{ marginTop: "75px", width: "100%" }}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navbar;

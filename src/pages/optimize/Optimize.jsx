import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { BarChart } from "react-bootstrap-icons";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import Speedometter from "./Speedometter";
import Chartmetter from "./Chartmetter";
import { GraphUp, Speedometer2 } from "react-bootstrap-icons";
import "./Optimize.css";
function Optimize() {
  return (
    <React.Fragment>
      <Navbar />
      <div id="layoutSidenav">
        <div className="container-fluid p-0">
          <div className="d-flex mx-0">
            <NavbarLeft />
            <div style={{ marginTop: "75px", width: "100%" }}>
              <main></main>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Optimize;

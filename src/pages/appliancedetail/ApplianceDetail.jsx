import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import "./ApplianceDetail.css";
import { House, BarChart, GraphUp } from "react-bootstrap-icons";
import hinhanh from "../../assets/images/maygiat.jpg";
import Chartmetter from "../home/Chartmetter";
import VerticalBarChart from "./VerticalBarChart";
import Status from "../../components/status/Status";
function ApplianceDetail() {
  return (
    <React.Fragment>
      <Navbar />
      <div id="layoutSidenav">
        <div className="container-fluid p-0">
          <div className="d-flex mx-0">
            <NavbarLeft />
            <div style={{ marginTop: "75px", width: "100%" }}>
              <main>
                <div className="container-fluid px-4">
                  <ol className="breadcrumb mb-4">
                    <li class="breadcrumb-item">
                      <House />
                    </li>
                    <li className="breadcrumb-item">
                      <a href="index.html">Quản lý phòng</a>
                    </li>
                    <li className="breadcrumb-item">Quản lý thiết bị</li>
                    <li className="breadcrumb-item">Máy giặt</li>
                  </ol>
                  <div class="row">
                    <div class="col-xl-4">
                      <img
                        src={hinhanh}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <div class="col-xl-4">
                      <table class="table">
                        <tbody>
                          <tr>
                            <td>Loại thiết bị:</td>
                            <td>Flex</td>
                          </tr>
                          <tr>
                            <td>Công suất tiêu thụ hiện tại:</td>
                            <td>50 W</td>
                          </tr>
                          <tr>
                            <td>Công suất cao nhất:</td>
                            <td>4000 W</td>
                          </tr>
                          <tr>
                            <td>Tình trạng thiết bị:</td>
                            <td>
                              <Status index={1} />
                            </td>
                          </tr>
                          <tr>
                            <td>Công suất thấp nhất:</td>
                            <td>10 W</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div class="col-xl-6">
                      <div class="card mb-4">
                        <div
                          class="card-header"
                          style={{
                            display: "flex",
                            fontSize: "14px",
                            alignItems: "center",
                          }}
                        >
                          <GraphUp />
                          &nbsp; Theo dõi trực tiếp tiêu thụ
                        </div>
                        <div className="card-body">
                          <Chartmetter />
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-6">
                      <div class="card mb-4">
                        <div
                          class="card-header"
                          style={{
                            display: "flex",
                            fontSize: "14px",
                            alignItems: "center",
                          }}
                        >
                          <BarChart />
                          &nbsp; Thống kê tiêu thụ thiết bị
                        </div>
                        <div class="card-body">
                          <VerticalBarChart />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ApplianceDetail;

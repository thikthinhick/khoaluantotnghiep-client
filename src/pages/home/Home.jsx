import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { BarChart } from "react-bootstrap-icons";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import Speedometter from "./Speedometter";
import Chartmetter from "./Chartmetter";
import { GraphUp, Speedometer2 } from "react-bootstrap-icons";
import "./home.css";
function Home() {
  return (
    <div>
      <Navbar />
      <div id="layoutSidenav">
        <div className="container-fluid p-0">
          <div className="d-flex mx-0">
            <NavbarLeft />
            <div style={{ marginTop: "75px", width: "100%" }}>
              <main>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-xl-3 col-md-6">
                      <div class="card bg-primary text-white mb-4">
                        <div class="card-body">Tổng tiêu thụ trong ngày</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                          <div class="small text-white">100.23 kWh</div>
                          <div class="small text-white">
                            <BarChart />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                      <div class="card bg-warning text-white mb-4">
                        <div class="card-body">Tổng tiêu thụ trong tháng</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                          <div class="small text-white">100.23 kWh</div>
                          <div class="small text-white">
                            <BarChart />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                      <div class="card bg-success text-white mb-4">
                        <div class="card-body">Tổng tiêu thụ trong năm</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                          <div class="small text-white">100.23 kWh</div>
                          <div class="small text-white">
                            <BarChart />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                      <div class="card bg-danger text-white mb-4">
                        <div class="card-body">Tổng tiêu thụ</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                          <div class="small text-white">100.23 kWh</div>
                          <div class="small text-white">
                            <BarChart />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mx-1">
                  <div className="col-xl-3">
                    <div class="card">
                      <div className="card-header align-items-center d-flex">
                        <Speedometer2 />
                        &nbsp; Công tơ điện
                      </div>
                      <div class="card-body">
                        <Speedometter />
                        <div>
                          <table className="table detail-speedmetter">
                            <tbody>
                              <tr>
                                <td>Công suất hiện tại:</td>
                                <td>50 W</td>
                              </tr>
                              <tr>
                                <td>Công suất cao nhất:</td>
                                <td>4000 W</td>
                              </tr>
                              <tr>
                                <td>Công suất thấp nhất:</td>
                                <td>10 W</td>
                              </tr>
                              <tr>
                                <td>Tiêu thụ ở chế độ chờ:</td>
                                <td>100 kWh</td>
                              </tr>
                              <tr>
                                <td>Số thiết bị đang hoạt động:</td>
                                <td>10 / 22</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-9">
                    <div class="card mb-4">
                      <div className="card-header align-items-center d-flex">
                        <GraphUp />
                        &nbsp; Biểu đồ theo dõi tiêu thụ trực tiếp
                      </div>
                      <div class="card-body">
                        <Chartmetter />
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

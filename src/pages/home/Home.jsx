import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { BarChart } from "react-bootstrap-icons";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import Speedometter from "./Speedometter";
function Home() {
  return (
    <div>
      <Navbar />
      <div id="layoutSidenav">
        <div className="container-fluid p-0">
          <div className="d-flex mx-0">
            <NavbarLeft />
            <div style={{ height: "2000px", marginTop: "60px", width: "100%" }}>
              <main>
                <div class="container-fluid px-2">
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
                <div className="row">
                  <div className="col-xl-3">
                    <Speedometter />
                  </div>
                  <div className="cols-xl-9"></div>
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

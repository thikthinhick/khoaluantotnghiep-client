import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { BarChart } from "react-bootstrap-icons";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import { GraphUp, Speedometer2, House } from "react-bootstrap-icons";
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
              <main>
                <div class="container-fluid px-4">
                  <ol className="breadcrumb mb-4">
                    <li class="breadcrumb-item">
                      <House />
                    </li>
                    <li className="breadcrumb-item">
                      <a href="index.html">Giải pháp</a>
                    </li>
                  </ol>
                  <div>
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        class="form-check-label"
                        for="flexSwitchCheckDefault"
                      >
                        Tắt thiết bị khi thiết bị ở chế độ chờ
                      </label>
                    </div>
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        class="form-check-label"
                        for="flexSwitchCheckDefault"
                      >
                        Sử dụng lập lịch thông minh
                      </label>
                    </div>
                    <div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="option1"
                        />
                        <label class="form-check-label" for="inlineRadio1">
                          Biểu giá đơn
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="option2"
                        />
                        <label class="form-check-label" for="inlineRadio2">
                          Biểu giá theo thời điểm
                        </label>
                      </div>
                    </div>
                    <select
                      class="form-select"
                      style={{ width: "300px" }}
                      aria-label="Default select example"
                    >
                      <option selected>
                        Chọn khoảng thời gian sử dụng để tối ưu
                      </option>
                      <option value="1">Tất cả các thời gian</option>
                      <option value="2">Quý 1</option>
                      <option value="3">Quý 2</option>
                      <option value="2">Quý 3</option>
                      <option value="3">Quý 4</option>
                    </select>
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

export default Optimize;

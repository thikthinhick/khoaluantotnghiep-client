import React from "react";
import Navbar from "../../components/NavbarTop/NavbarTop";
import { BarChart } from "react-bootstrap-icons";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import {
  GraphUp,
  Speedometer2,
  House,
  ArrowLeftRight,
} from "react-bootstrap-icons";
import { ButtonPrimary } from "../../components/button/Button";
import VerticalBarChart from "../appliancedetail/VerticalBarChart";
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
                      <div className="d-flex">
                        <label
                          className="form-check-label"
                          for="flexSwitchCheckDefault"
                        >
                          Sử dụng lập lịch thông minh
                        </label>
                        {/* <ButtonPrimary title={"CHỈNH SỬA"} /> */}
                      </div>
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
                    {/* <select
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
                    </select> */}
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
                          <BarChart />
                          &nbsp; Thống kê tiêu thụ thiết bị hiện tại
                        </div>
                        <div class="card-body">
                          <VerticalBarChart />
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
                          &nbsp; Thống kê tiêu thụ thiết bị sau khi tối ưu
                        </div>
                        <div class="card-body">
                          <VerticalBarChart />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xl-8">
                      <div class="card mb-4">
                        <div
                          class="card-header"
                          style={{
                            display: "flex",
                            fontSize: "14px",
                            alignItems: "center",
                          }}
                        >
                          <ArrowLeftRight />
                          &nbsp; So sánh
                        </div>
                        <div class="card-body">
                          <table class="table">
                            <thead>
                              <tr>
                                <th scope="col">Tên thông số</th>
                                <th scope="col">Tiêu thụ hiện tại</th>
                                <th scope="col">Tiêu thụ sau khi tối ưu</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">Tổng số tiêu thụ</th>
                                <td>599 kWh</td>
                                <td>540 kWh</td>
                              </tr>
                              <tr>
                                <th scope="row">Tổng số tiền phải chi trả</th>
                                <td>200.000 VNĐ</td>
                                <td>190.000 VNĐ</td>
                              </tr>
                              <tr>
                                <th scope="row">Số lượng tiêu thụ mỗi ngày</th>
                                <td>100 kWh</td>
                                <td>80 kWh</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-4">
                      <div class="card mb-4">
                        <div class="card-header">
                          <i class="fas fa-table me-1"></i>
                          Kết quả
                        </div>
                        <div class="card-body">
                          <div>Năng lượng tiết kiệm: 20 kWh/năm</div>
                          <div>Số tiền tiết kiệm được: 100.000 VNĐ/năm</div>
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

export default Optimize;

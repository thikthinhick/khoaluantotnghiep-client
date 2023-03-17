import React from "react";
import { BarChart } from "react-bootstrap-icons";
import VerticalBarChart from "../appliancedetail/VerticalBarChart";
import "./Optimize.css";
function Optimize() {
  return (
    <main>
      <div className="container-fluid px-4">
        <div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <label className="form-check-label" for="flexSwitchCheckDefault">
              Tắt thiết bị khi thiết bị ở chế độ chờ
            </label>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <div className="d-flex">
              <label className="form-check-label" for="flexSwitchCheckDefault">
                Sử dụng lập lịch tối ưu
              </label>
            </div>
          </div>
        </div>
        <div className="mt-4 row">
          <div className="col-9">
            <div className="card mb-4">
              <div
                className="card-header"
                style={{
                  display: "flex",
                  fontSize: "14px",
                  alignItems: "center",
                }}
              >
                <BarChart />
                &nbsp; Biểu đồ so sánh tiêu thụ trước và sau tối ưu
              </div>
              <div className="card-body">
                <VerticalBarChart />
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="card mb-4">
              <div className="card-header">Kết quả</div>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span>Số điện tiết kiệm:</span>
                  <b>20 số</b>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Số tiền tiết kiệm:</span> <b>100,000 VNĐ</b>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-xl-8">
            <div className="card mb-4">
              <div
                className="card-header"
                style={{
                  display: "flex",
                  fontSize: "14px",
                  alignItems: "center",
                }}
              >
                <ArrowLeftRight />
                &nbsp; So sánh
              </div>
              <div className="card-body">
                <table className="table">
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
          <div className="col-xl-4">
            <div className="card mb-4">
              <div className="card-header">
                <i className="fas fa-table me-1"></i>
                Kết quả
              </div>
              <div className="card-body">
                <div>Năng lượng tiết kiệm: 20 kWh/năm</div>
                <div>Số tiền tiết kiệm được: 100.000 VNĐ/năm</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </main>
  );
}

export default Optimize;

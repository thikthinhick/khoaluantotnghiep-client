import React from "react";
import { BarChart, Cash } from "react-bootstrap-icons";
import StatisticBarChart1 from "./StatisticBarChart1";
import StatisticBarChart2 from "./StatisticBarChart2";
import PieChart from "./PieChart";
import HorizontalChart from "./HorizontalChart";
import "./Statistic.css";
import Pagination from "../../components/pagination/Pagination";
function Statistic() {
  return (
    <main>
      <div className="container-fluid px-4">
        <div>
          <div className="card mb-4">
            <div
              className="card-header"
              style={{
                display: "flex",
                fontSize: "14px",
                alignItems: "center",
              }}
            >
              <Cash />
              &nbsp; Danh sách hóa đơn
            </div>
            <div className="card-body">
              <table id="customers">
                <tr>
                  <th>STT</th>
                  <th>Tháng</th>
                  <th>Năm</th>
                  <th>Loại hóa đơn</th>
                  <th>Số điện</th>
                  <th>Trung bình</th>
                  <th>Số tiền phải trả</th>
                </tr>
                {[1, 1, 1, 1, 1].map((element, index) => (
                  <tr>
                    <td>{index + 1}</td>

                    <td>1</td>
                    <td>2023</td>
                    <td>Theo thời điểm</td>
                    <td>100</td>
                    <td>3.2</td>
                    <td>120,000 VNĐ</td>
                  </tr>
                ))}
              </table>
              <div className="mt-3" style={{ float: "right" }}>
                {/* <Pagination /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 row">
          <div className="col-6">
            <div className="card mb-4">
              <div
                className="card-header"
                style={{
                  display: "flex",
                  fontSize: "14px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <BarChart />
                  &nbsp;Biểu đồ tiêu thụ các ngày gần nhất
                </div>
                <div className="choose-time">
                  <input type="date" />
                </div>
              </div>
              <div className="card-body">
                <StatisticBarChart1 />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card mb-4">
              <div
                className="card-header"
                style={{
                  display: "flex",
                  fontSize: "14px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <BarChart />
                  &nbsp; Biểu đồ tiêu thụ TB theo từng giờ
                </div>

                <div className="choose-time">
                  <select name="time">
                    <option value="0">Theo ngày</option>
                    <option value="1">Theo tháng</option>
                    <option value="2">Theo năm</option>
                    <option value="2">Tất cả</option>
                  </select>
                  <input type="date" />
                </div>
              </div>
              <div className="card-body">
                <StatisticBarChart2 />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card mb-4">
              <div
                className="card-header"
                style={{
                  display: "flex",
                  fontSize: "14px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <BarChart />
                  &nbsp; Biểu đồ lượng tiêu thụ các phòng
                </div>

                <div className="choose-time">
                  <select name="time">
                    <option value="0">Theo ngày</option>
                    <option value="1">Theo tháng</option>
                    <option value="2">Theo năm</option>
                    <option value="2">Tất cả</option>
                  </select>
                  <input type="date" />
                </div>
              </div>
              <div className="card-body">
                <PieChart />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card mb-4">
              <div
                className="card-header"
                style={{
                  display: "flex",
                  fontSize: "14px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <BarChart />
                  &nbsp; Biểu đồ lượng tiêu thụ các thiết bị
                </div>

                <div className="choose-time">
                  <select name="time">
                    <option value="0">Theo ngày</option>
                    <option value="1">Theo tháng</option>
                    <option value="2">Theo năm</option>
                    <option value="2">Tất cả</option>
                  </select>
                  <input type="date" />
                </div>
              </div>
              <div className="card-body">
                <HorizontalChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Statistic;

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
                  <th>Ngày bắt đầu</th>
                  <th>Ngày kết thúc</th>
                  <th>Số ngày</th>
                  <th>Loại hóa đơn</th>
                  <th>Số điện</th>
                  <th>Trung bình</th>
                  <th>Số tiền phải trả</th>
                </tr>
                {[1, 1, 1, 1, 1].map((element, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>2023-01-01</td>
                    <td>2023-01-31</td>
                    <td>31</td>
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
                }}
              >
                <BarChart />
                &nbsp; Biểu đồ so sánh tiêu thụ trước và sau tối ưu
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
                }}
              >
                <BarChart />
                &nbsp; Biểu đồ so sánh tiêu thụ trước và sau tối ưu
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
                }}
              >
                <BarChart />
                &nbsp; Biểu đồ so sánh tiêu thụ trước và sau tối ưu
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
                }}
              >
                <BarChart />
                &nbsp; Biểu đồ so sánh tiêu thụ trước và sau tối ưu
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

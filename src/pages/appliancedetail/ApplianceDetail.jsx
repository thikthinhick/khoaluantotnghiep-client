import React from "react";
import { BarChart, GraphUp } from "react-bootstrap-icons";
import hinhanh from "../../assets/images/maygiat.jpg";
import Status from "../../components/status/Status";
import Chartmetter from "../home/Chartmetter";
import "./ApplianceDetail.css";
import VerticalBarChart from "./VerticalBarChart";
function ApplianceDetail() {
  return (
    <main>
      <div className="container-fluid px-4 pt-4 container__appliance-detail">
        <div class="row header">
          <div class="col-xl-8 d-flex">
            <div class="col-xl-6">
              <img
                src={hinhanh}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="col-xl-6 description">
              <h3>Máy giặt</h3>
              <ul>
                <li>
                  <b>Mô tả: </b>Là thiết bị dùng để giặt đồ trong gia đình
                </li>
                <li>
                  <b>Công suất hiện tại: </b>
                  123 W
                </li>
                <li className="d-flex align-items-center">
                  <b>Trạng thái :</b>&ensp;
                  <Status index={1} />
                </li>
                <li className="mt-2">
                  <a class="btn btn-outline-dark mt-auto" href="#">
                    Tắt thiết bị
                  </a>
                  <a class="btn btn-outline-dark mx-2" href="#">
                    Theo dõi
                  </a>
                  <a class="btn btn-outline-dark mx-2" href="#">
                    Lập lịch
                  </a>
                  <a class="btn btn-outline-dark mt-auto" href="#">
                    Xóa
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-xl-4">
            <table class="table">
              <tbody>
                <tr>
                  <td colspan="2" style={{ textAlign: "center" }}>
                    <b>Thống kê liên quan</b>
                  </td>
                </tr>
                <tr>
                  <td>Loại thiết bị:</td>
                  <td>Flex</td>
                </tr>
                <tr>
                  <td>Tổng tiêu thụ tháng này</td>
                  <td>50 kWh</td>
                </tr>
                <tr>
                  <td>Tổng tiêu thụ tháng trước</td>
                  <td>50 kWh</td>
                </tr>
                <tr>
                  <td>Chi phí hiện phải trả:</td>
                  <td>40.000 VNĐ</td>
                </tr>
                <tr>
                  <td>Chi phí tháng trước:</td>
                  <td>80.000 VNĐ</td>
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
  );
}

export default ApplianceDetail;

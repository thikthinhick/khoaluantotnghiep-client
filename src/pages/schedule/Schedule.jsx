import React from "react";
import Navbar from "../../components/NavbarTop/NavbarTop";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import { House, Calendar2 } from "react-bootstrap-icons";
import "./Schedule.css";
import {
  ButtonPrimary,
  ButtonError,
  ToggleSwitch,
} from "../../components/button/Button";
import EditSchedule from "./EditSchedule";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Pagination from "../../components/pagination/Pagination";
function Schedule() {
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
                  <h3>Quản lý lịch trình</h3>
                  <ol className="breadcrumb mb-4">
                    <li class="breadcrumb-item">
                      <a href="index.html">
                        {" "}
                        <House />
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="index.html">Quản lý phòng</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="index.html">Quản lý thiết bị</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="index.html">Máy giặt</a>
                    </li>
                    <li className="breadcrumb-item">Lịch trình</li>
                  </ol>
                  <div className="card mb-4">
                    <div className="card-header align-items-center d-flex">
                      <Calendar2 />
                      &nbsp; Danh sách lịch trình của thiết bị
                    </div>
                    <div className="card-body">
                      <div className="row px-3 container-manager-room">
                        <table className="table border">
                          <thead className="thead-dark">
                            <tr>
                              <th scope="col">Số thứ tự</th>
                              <th scope="col">Tên lịch trình</th>
                              <th scope="col">Lặp lại</th>
                              <th scope="col">Thời gian còn lại</th>
                              <th scope="col">Tùy chọn</th>
                              <th scope="col">Bật / tắt</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[1, 1, 1].map((Element, index) => (
                              <tr>
                                <th scope="row">{index + 1}</th>
                                <td>Lịch trình thứ {index + 1}</td>
                                <td>T2, T3, T4, CN</td>
                                <td>9 giờ 20 phút</td>
                                <td>
                                  <div className="d-flex">
                                    <ButtonPrimary title={"CHỈNH SỬA"} />
                                    <ButtonError
                                      title={"XÓA LỊCH TRÌNH"}
                                      style={{ marginLeft: "10px" }}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <ToggleSwitch />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div className="d-flex justify-content-between">
                          <Popup
                            trigger={
                              <button className="button">
                                {" "}
                                Tạo lịch trình mới
                              </button>
                            }
                            modal
                            nested
                            contentStyle={{ width: "35%" }}
                          >
                            {(close) => <EditSchedule close={close} />}
                          </Popup>

                          <Pagination />
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

export default Schedule;

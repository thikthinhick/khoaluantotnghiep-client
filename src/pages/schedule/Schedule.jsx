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
    <main>
      <div className="container-fluid px-4">
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
                          <a class="btn btn-outline-dark mt-auto" href="#">
                            Chỉnh sửa
                          </a>
                          <a class="btn btn-outline-dark mt-auto mx-2" href="#">
                            Xóa
                          </a>
                        </div>
                      </td>
                      <td>
                        <ToggleSwitch />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="d-flex justify-content-between p-0">
                <Popup
                  style={{ backgroundColor: "red" }}
                  trigger={
                    <a class="btn btn-outline-dark mt-auto" href="#">
                      Tạo lịch mới
                    </a>
                  }
                  modal
                  nested
                  contentStyle={{}}
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
  );
}

export default Schedule;

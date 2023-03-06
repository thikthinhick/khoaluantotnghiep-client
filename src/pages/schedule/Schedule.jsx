import React from "react";
import { Calendar2 } from "react-bootstrap-icons";
import Popup from "../../components/popup/Popup";
import { ToggleSwitch } from "../../components/button/Button";
import "./Schedule.css";
import EditSchedule from "./EditSchedule";
const data = ["T2", "T3", "T4", "T5", "T6", "T7", "CN", "None"];
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
              <Popup
                title={"Tạo lịch trình mới"}
                trigger={
                  <a class="btn btn-outline-dark mt-auto">Tạo lịch trình</a>
                }
              >
                <EditSchedule />
              </Popup>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Schedule;

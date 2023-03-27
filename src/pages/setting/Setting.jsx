import React from "react";
import { Table } from "react-bootstrap-icons";
import profile from "../../assets/images/user.webp";
import Status from "../../components/status/Status";
export default function Setting() {
  return (
    <main>
      <div className="container-fluid px-4">
        <b>Chọn biểu giá điện</b>
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
              Biểu giá điện đơn
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
              Biểu giá điện theo thời điểm
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
              Biểu giá điện theo số lượng điện sử dụng
            </label>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-header">
            <Table />
            &nbsp; Danh sách người dùng
          </div>
          <div className="card-body">
            <table id="customers">
              <tr>
                <th>STT</th>
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>Danh sách phòng quản lý</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
              {[1, 1, 1, 1, 1].map((element, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={profile}
                      style={{
                        height: "26px",
                        width: "26px",
                        borderRadius: "13px",
                        marginRight: "5px",
                      }}
                    />
                    Chuong2001
                  </td>
                  <td>chuong03022001@gmail.com</td>
                  <td>Phòng ngủ, Phòng khách, Phòng bếp</td>
                  <td>
                    <Status index={1} />
                  </td>
                  <td>
                    <a className="btn btn-outline-dark mt-auto">Chỉnh sửa</a>
                    {/* <a className="btn btn-outline-dark mt-auto mx-2">
                      Tạo phòng mới
                    </a> */}
                  </td>
                </tr>
              ))}
            </table>
            <div className="mt-3" style={{ float: "right" }}></div>
          </div>
        </div>
      </div>
    </main>
  );
}

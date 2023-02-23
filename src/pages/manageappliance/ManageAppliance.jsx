import React from "react";
import { Table } from "react-bootstrap-icons";
import { ButtonSuccess, ToggleSwitch } from "../../components/button/Button";
import "./ManageAppliance.css";

import Pagination from "../../components/pagination/Pagination";
import Status from "../../components/status/Status";
const data = [
  {
    name: "Máy giặt",
    status: 1,
    consume: 100,
    on: false,
  },
  {
    name: "Máy rửa bát",
    status: 2,
    consume: 100,
    on: false,
  },
  {
    name: "Bóng đèn",
    status: 3,
    consume: 100,
    on: false,
  },
  {
    name: "Bình nóng lạnh",
    status: 4,
    consume: 100,
    on: true,
  },
];
function ManageAppliance() {
  return (
    <main>
      <div className="container-fluid px-4">
        <div className="card mb-4">
          <div className="card-header align-items-center d-flex">
            <Table />
            &nbsp; Danh sách thiết bị
          </div>
          <div className="card-body">
            <div className="row px-3 container-manager-room">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">ID thiết bị</th>
                    <th scope="col">Tên thiết bị</th>
                    <th scope="col">Tình trạng thiết bị</th>
                    <th scope="col">Tiêu thụ hiện tại</th>
                    <th scope="col">Loại thiết bị</th>
                    <th scope="col"></th>
                    <th scope="col">Bật / tắt</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((element, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{element.name}</td>
                      <td>
                        <Status index={element.status} />
                      </td>
                      <td>110 W</td>
                      <td>Loại 1</td>
                      <td>
                        <div className="d-flex">
                          <a class="btn btn-outline-dark mt-auto" href="#">
                            Chi tiết
                          </a>
                          <a class="btn btn-outline-dark mt-auto mx-2" href="#">
                            Lập lịch
                          </a>
                          <a class="btn btn-outline-dark mt-auto" href="#">
                            Xóa thiết bị
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
              <div className="p-0 d-flex justify-content-between">
                <a class="btn btn-outline-dark mt-auto" href="#">
                  Thêm thiết bị
                </a>
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ManageAppliance;

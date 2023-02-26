import React from "react";
import {
  Table,
  Speedometer,
  PeopleFill,
  DatabaseFill,
} from "react-bootstrap-icons";
import { ButtonSuccess, ToggleSwitch } from "../../components/button/Button";
import "./ManageAppliance.css";
import Pagination from "../../components/pagination/Pagination";
import Profile from "../../assets/images/user.webp";
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
  {
    name: "Bình nóng lạnh",
    status: 4,
    consume: 100,
    on: true,
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
      <div className="container-fluid px-4 containerManageAppliance">
        <div className="containerManageAppliance__header">
          <div className="d-flex">
            <div className="background-image"></div>
            <div>
              <div className="content">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span>Công suất hiện tại</span>
                    <h2>453 W</h2>
                  </div>
                  <div className="icon">
                    <Speedometer size={20} />
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span>Tổng lượng điện tiêu thụ</span>
                    <h2>
                      1000 kWh <i class="fas fa-kiss-wink-heart    "></i>
                    </h2>
                  </div>
                  <div className="icon">
                    <DatabaseFill size={20} />
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span>Người quản lý</span>
                    <ul className="d-flex users">
                      <li>
                        <img src={Profile} />
                      </li>
                      <li>
                        <img src={Profile} />
                      </li>
                      <li>
                        <img src={Profile} />
                      </li>
                    </ul>
                  </div>
                  <div className="icon">
                    <PeopleFill size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4 my-4">
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
                <div>
                  <a class="btn btn-outline-dark mt-auto" href="#">
                    Thêm thiết bị
                  </a>
                  <a class="btn btn-outline-dark mt-auto mx-2" href="#">
                    Tắt tất cả
                  </a>
                </div>

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

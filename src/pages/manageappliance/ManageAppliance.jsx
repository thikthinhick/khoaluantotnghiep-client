import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import { Table, House } from "react-bootstrap-icons";
import "./ManageAppliance.css";
import {
  ButtonPrimary,
  ButtonError,
  ButtonSuccess,
  ToggleSwitch,
} from "../../components/button/Button";

import Status from "../../components/status/Status";
import Pagination from "../../components/pagination/Pagination";
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
    <React.Fragment>
      <Navbar />
      <div id="layoutSidenav">
        <div className="container-fluid p-0">
          <div className="d-flex mx-0">
            <NavbarLeft />
            <div style={{ marginTop: "75px", width: "100%" }}>
              <main>
                <div className="container-fluid px-4">
                  <h3>Quản lý phòng</h3>
                  <ol className="breadcrumb mb-4">
                    <li class="breadcrumb-item">
                      <House />
                    </li>
                    <li className="breadcrumb-item">
                      <a href="index.html">Quản lý phòng</a>
                    </li>
                    <li className="breadcrumb-item">Quản lý thiết bị</li>
                  </ol>
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
                                    <ButtonPrimary title={"XEM CHI TIẾT"} />
                                    <ButtonSuccess
                                      title={"LẬP LỊCH"}
                                      style={{ marginLeft: "10px" }}
                                    />
                                    <ButtonError
                                      title={"XÓA THIẾT BỊ"}
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
                          <ButtonSuccess
                            title={"THÊM THIẾT BỊ"}
                          ></ButtonSuccess>
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

export default ManageAppliance;

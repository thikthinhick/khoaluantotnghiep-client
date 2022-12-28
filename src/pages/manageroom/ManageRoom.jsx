import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import NavbarLeft from "../../components/NavbarLeft/NavbarLeft";
import { Table } from "react-bootstrap-icons";
import "./ManageRoom.css";
import {
  ButtonPrimary,
  ButtonError,
  ButtonSuccess,
} from "../../components/button/Button";
import Pagination from "../../components/pagination/Pagination";
function ManageRoom() {
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
                  <div className="card mb-4">
                    <div className="card-header align-items-center d-flex">
                      <Table />
                      &nbsp; Danh sách phòng
                    </div>
                    <div className="card-body">
                      <div className="row px-3 container-manager-room">
                        <table className="table border">
                          <thead className="thead-dark">
                            <tr>
                              <th scope="col">ID Phòng</th>
                              <th scope="col">Tên phòng</th>
                              <th scope="col">Số thiết bị</th>
                              <th scope="col">Công suất hiện tại</th>
                              <th scope="col">Người quản lý</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
                              (Element, index) => (
                                <tr>
                                  <th scope="row">{index + 1}</th>
                                  <td>Phòng ngủ</td>
                                  <td>5 thiết bị</td>
                                  <td>200 W</td>
                                  <td>Chương, Vân</td>
                                  <td>
                                    <div className="d-flex">
                                      <ButtonPrimary title={"XEM CHI TIẾT"} />
                                      <ButtonError
                                        title={"XÓA PHÒNG"}
                                        style={{ marginLeft: "10px" }}
                                      />
                                    </div>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                        <div className="d-flex justify-content-between">
                          <ButtonSuccess
                            title={"TẠO PHÒNG MỚI"}
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

export default ManageRoom;

import React from "react";
import { Table, House } from "react-bootstrap-icons";
import "./ManageRoom.css";
import { ButtonPrimary, ButtonError } from "../../components/button/Button";
import Popup from "reactjs-popup";
import EditRoom from "./EditRoom";
import Pagination from "../../components/pagination/Pagination";
function ManageRoom() {
  return (
    <main>
      <div className="container-fluid px-4">
        <h3>Quản lý phòng</h3>
        <ol className="breadcrumb mb-4">
          <li class="breadcrumb-item">
            <a href="index.html">
              <House />
            </a>
          </li>
          <li className="breadcrumb-item">Quản lý phòng</li>
        </ol>
        {/* <div className="card mb-4">
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
                  {[1, 1, 1, 1, 1].map((Element, index) => (
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
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-between">
                <Popup
                  trigger={
                    <button style={{ background: "none" }}>
                      <ButtonPrimary title={"TẠO PHÒNG MỚI"} />
                    </button>
                  }
                  modal
                  nested
                  contentStyle={{ width: "35%", borderRadius: "10px" }}
                >
                  {(close) => <EditRoom close={close} />}
                </Popup>
                <Pagination />
              </div>
            </div>
          </div>
        </div> */}
        <div class="container">
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <div class="col mb-5">
              <div class="card h-100">
                <img
                  class="card-img-top"
                  src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                  alt="..."
                />
                <div class="card-body p-4">
                  <div class="text-center">
                    <h5 class="fw-bolder">Nhà bếp</h5>
                    <p>
                      Shop Homepage is a starter template for a Bootstrap based
                      online store or ecommerce website
                    </p>
                    <div>
                      <ul className="d-flex">
                        <li style={{ width: "30px" }}>
                          <img
                            style={{
                              height: 40,
                              width: 40,
                              borderRadius: 20,
                              objectFit: "cover",
                              border: "2px solid white",
                            }}
                            className="image-profile"
                            src="https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg"
                          />
                        </li>
                        <li style={{ width: "30px" }}>
                          <img
                            style={{
                              height: 40,
                              width: 40,
                              borderRadius: 20,
                              objectFit: "cover",
                              border: "2px solid white",
                            }}
                            className="image-profile"
                            src="https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg"
                          />
                        </li>
                        <li style={{ width: "30px" }}>
                          <img
                            style={{
                              height: 40,
                              width: 40,
                              borderRadius: 20,
                              objectFit: "cover",
                              border: "2px solid white",
                            }}
                            className="image-profile"
                            src="https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg"
                          />
                        </li>
                        <li style={{ width: "30px" }}>
                          <img
                            style={{
                              height: 40,
                              width: 40,
                              borderRadius: 20,
                              objectFit: "cover",
                              border: "2px solid white",
                            }}
                            className="image-profile"
                            src="https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div class="text-center d-flex">
                    <a class="btn btn-outline-dark mt-auto" href="#">
                      Chi tiết
                    </a>
                    <div>100W</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col mb-5">
              <div class="card h-100">
                <img
                  class="card-img-top"
                  src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                  alt="..."
                />

                <div class="card-body p-4">
                  <div class="text-center">
                    <h5 class="fw-bolder">Nhà tắm</h5>
                  </div>
                </div>

                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div class="text-center">
                    <a class="btn btn-outline-dark mt-auto" href="#">
                      Chi tiết
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col mb-5">
              <div class="card h-100">
                <img
                  class="card-img-top"
                  src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                  alt="..."
                />

                <div class="card-body p-4">
                  <div class="text-center">
                    <h5 class="fw-bolder">Phòng ngủ 1</h5>
                  </div>
                </div>

                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div class="text-center">
                    <a class="btn btn-outline-dark mt-auto" href="#">
                      Chi tiết
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col mb-5">
              <div class="card h-100">
                <img
                  class="card-img-top"
                  src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                  alt="..."
                />

                <div class="card-body p-4">
                  <div class="text-center">
                    <h5 class="fw-bolder">Phòng ngủ 2</h5>
                  </div>
                </div>

                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div class="text-center">
                    <a class="btn btn-outline-dark mt-auto" href="#">
                      Chi tiết
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col mb-5">
              <div class="card h-100">
                <img
                  class="card-img-top"
                  src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                  alt="..."
                />

                <div class="card-body p-4">
                  <div class="text-center">
                    <h5 class="fw-bolder">Fancy Product</h5>
                  </div>
                </div>

                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div class="text-center">
                    <a class="btn btn-outline-dark mt-auto" href="#">
                      View options
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ManageRoom;

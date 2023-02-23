import React from "react";
import Profile from "../../assets/images/user.webp";
function Room() {
  return (
    <div class="col container-room">
      <div class="card">
        <img
          class="card-img"
          src="https://bedesign.vn/wp-content/uploads/2022/03/ifYeUmdP3QBcScG-lGBjF_prtajlv6f_1bS0VMzYqlMGBsdQpownlxCDkwJ6LcdUVEI0D_ukv4_PNRrKqyO-xjKttQDGVQ8lWpCVUpJSp5sTKYOGejPgvDqa9f76DsOsMEdqmII.jpg"
          alt="..."
        />
        <div className="container-room__body">
          <div className="top">
            <h5>Nhà bếp</h5>
            <p>10 thiết bị</p>
          </div>
          <div>
            Công suất hiện tại: <b style={{ color: "#009933" }}>100W</b>
          </div>
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

        <div class="card-footer pt-0 border-top-0 bg-transparent">
          <div class="text-center d-flex justify-content-between">
            <a class="btn btn-outline-dark mt-auto" href="#">
              Chi tiết
            </a>
            <a class="btn btn-outline-dark mt-auto" href="#">
              Chỉnh sửa
            </a>
            <a class="btn btn-outline-dark mt-auto" href="#">
              Xóa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;

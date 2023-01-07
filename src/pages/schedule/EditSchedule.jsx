import React from "react";
import "./Schedule.css";
import { ButtonPrimary } from "../../components/button/Button";
const data = ["T2", "T3", "T4", "T5", "T6", "T7", "CN", "None"];
function EditSchedule({ close }) {
  return (
    <div className="modal-popup">
      <button className="close-popup" onClick={close}>
        &times;
      </button>
      <div className="header-popup">Tạo lịch trình mới</div>
      <div className="content-popup">
        {" "}
        <label style={{ fontWeight: "bold" }}>Tên lịch trình:</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Nhập tên lịch trình"
          />
        </div>
        <label style={{ fontWeight: "bold" }}>
          Thời gian bắt đầu / kết thúc:
        </label>
        <div class="d-flex">
          <div class="input-group mb-3">
            <input
              type="time"
              class="form-control"
              placeholder="Thời gian bắt đầu"
            />
          </div>
          &nbsp;&nbsp;
          <div class="input-group mb-3">
            <input
              type="time"
              class="form-control"
              placeholder="Thời gian kết thúc"
            />
          </div>
        </div>
        <label style={{ fontWeight: "bold" }}>Chọn thời gian lặp:</label>
        <div class="input-group mb-3">
          {data.map((element, index) => (
            <div class="form-check form-check-inline" key={index}>
              <input
                class="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                value="option1"
              />
              <label class="form-check-label" for="inlineCheckbox1">
                {element}
              </label>
            </div>
          ))}
        </div>
        <div>
          <b>Tổng thời gian hoạt động:</b> 2 giờ 30 phút
        </div>
        <div className="d-flex mt-2" style={{ justifyContent: "center" }}>
          <ButtonPrimary title={"TẠO LỊCH"} />
        </div>
      </div>
    </div>
  );
}

export default EditSchedule;

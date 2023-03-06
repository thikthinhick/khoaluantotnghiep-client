import React from "react";
import "./Schedule.css";
const data = ["T2", "T3", "T4", "T5", "T6", "T7", "CN", "None"];
function EditSchedule() {
  return (
    <div class="modal-body">
      <div class="form-group mb-2">
        <label>Tên lịch trình</label>
        <input type="text" class="form-control" required />
      </div>

      <div className="form-group mb-2">
        <label>Thời gian bắt đầu / kết thúc:</label>
        <div class="d-flex">
          <div class="input-group">
            <input type="time" class="form-control" placeholder="Bắt đầu" />
          </div>
          &nbsp;&nbsp;
          <div class="input-group">
            <input type="time" class="form-control" placeholder="Kết thúc" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Lặp lại:</label>
        <div class="input-group">
          {data.map((element, index) => (
            <div class="form-check form-check-inline" key={index}>
              <input
                class="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                value="option1"
              />
              <label
                class="form-check-label"
                for="inlineCheckbox1"
                style={{ fontWeight: "400" }}
              >
                {element}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EditSchedule;

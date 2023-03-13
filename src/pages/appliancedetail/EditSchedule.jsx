import React, { useState } from "react";
import { URL } from "../../contants/Contants";
import axios from "axios";
function EditSchedule({ close, applianceId }) {
  const [formRepeat, setFormRepeat] = useState({
    T2: false,
    T3: false,
    T4: false,
    T5: false,
    T6: false,
    T7: false,
    CN: false,
  });
  const [form, setForm] = useState({
    name: "",
    startDate: "00:00",
    endDate: "23:59",
  });
  const hanleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleChangeCheckbox = (e) => {
    const { name } = e.target;
    setFormRepeat({ ...formRepeat, [name]: !formRepeat[name] });
  };
  const createSchedule = () => {
    let repeatDate = "";
    Object.keys(formRepeat).forEach((element) => {
      if (formRepeat[element]) repeatDate = repeatDate.concat(element + ",");
    });
    repeatDate = repeatDate.slice(0, repeatDate.length - 1);
    const body = {
      schedule: {
        repeatDate: repeatDate,
        name: form.name,
        endDate: form.endDate.concat(":00"),
        startDate: form.startDate.concat(":00"),
      },
      applianceId: applianceId,
    };
    axios
      .post(`${URL}api/schedule`, body)
      .then((res) => {
        alert("Tạo lịch trình thành công!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div class="modal-body">
        <div class="form-group mb-2">
          <label>Tên lịch trình</label>
          <input
            type="text"
            class="form-control"
            onChange={hanleChange}
            name="name"
            required
          />
        </div>

        <div className="form-group mb-2">
          <label>Thời gian bắt đầu / kết thúc:</label>
          <div class="d-flex">
            <div class="input-group">
              <input
                type="time"
                class="form-control"
                name="startDate"
                value={form.startDate}
                onChange={hanleChange}
                placeholder="Bắt đầu"
              />
            </div>
            &nbsp;&nbsp;
            <div class="input-group">
              <input
                type="time"
                class="form-control"
                name="endDate"
                value={form.endDate}
                onChange={hanleChange}
                placeholder="Kết thúc"
              />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Lặp lại:</label>
          <div class="input-group">
            {Object.keys(formRepeat).map((element, index) => (
              <div class="form-check form-check-inline" key={index}>
                <input
                  class="form-check-input"
                  type="checkbox"
                  name={element}
                  onChange={handleChangeCheckbox}
                  checked={formRepeat[element]}
                />
                <label
                  class="form-check-label"
                  for={element}
                  style={{ fontWeight: "400" }}
                >
                  {element}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="modal-content__footer">
        <div className="body">
          <input
            type="button"
            class="btn btn-default"
            data-dismiss="modal"
            value="Hủy"
            onClick={() => close(false)}
          />
          <input
            type="submit"
            class="btn btn-success"
            value="Ghi nhận"
            onClick={createSchedule}
          />
        </div>
      </div>
    </>
  );
}

export default EditSchedule;

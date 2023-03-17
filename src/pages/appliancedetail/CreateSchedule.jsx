import React, { useState } from "react";
import { URL } from "../../contants/Contants";
import axios from "axios";
function CreateSchedule({ close, applianceId, addSchedule }) {
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
    if (window.confirm("Bạn có muốn tạo lịch trình không ?")) {
      let repeatDay = "";
      Object.keys(formRepeat).forEach((element) => {
        if (formRepeat[element]) repeatDay = repeatDay.concat(element + ",");
      });
      repeatDay = repeatDay.slice(0, repeatDay.length - 1);
      const body = {
        schedule: {
          repeatDay: repeatDay,
          name: form.name,
          endDate: form.endDate,
          startDate: form.startDate,
        },
        applianceId: applianceId,
      };
      axios
        .post(`${URL}api/schedule`, body)
        .then((res) => {
          addSchedule(res.data.info);
          close();
          alert("Tạo lịch trình thành công!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <div className="modal-body">
        <div className="form-group mb-2">
          <label>Tên lịch trình</label>
          <input
            type="text"
            className="form-control"
            onChange={hanleChange}
            name="name"
            required
          />
        </div>

        <div className="form-group mb-2">
          <label>Thời gian bắt đầu / kết thúc:</label>
          <div className="d-flex">
            <div className="input-group">
              <input
                type="time"
                className="form-control"
                name="startDate"
                value={form.startDate}
                onChange={hanleChange}
                placeholder="Bắt đầu"
              />
            </div>
            &nbsp;&nbsp;
            <div className="input-group">
              <input
                type="time"
                className="form-control"
                name="endDate"
                value={form.endDate}
                onChange={hanleChange}
                placeholder="Kết thúc"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Lặp lại:</label>
          <div className="input-group">
            {Object.keys(formRepeat).map((element, index) => (
              <div className="form-check form-check-inline" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={element}
                  onChange={handleChangeCheckbox}
                  checked={formRepeat[element]}
                />
                <label
                  className="form-check-label"
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
            className="btn btn-default"
            data-dismiss="modal"
            value="Hủy"
            onClick={() => close(false)}
          />
          <input
            type="submit"
            className="btn btn-success"
            value="Ghi nhận"
            onClick={createSchedule}
          />
        </div>
      </div>
    </>
  );
}

export default CreateSchedule;

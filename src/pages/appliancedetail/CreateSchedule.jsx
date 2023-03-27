import React, { useState } from "react";
import { URL } from "../../contants/Contants";
import "./ApplianceDetail.css";
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
    scheduleOptimize: "0",
    estimatedTime: 1,
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
        typeSchedule: form.scheduleOptimize === "0" ? false : true,
        estimatedTime: form.estimatedTime,
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
          <label>Loại lịch trình</label>
          <div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="scheduleOptimize"
                onChange={hanleChange}
                value="0"
                checked={form.scheduleOptimize === "0"}
              />
              <span>Lịch thông thường</span>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                onChange={hanleChange}
                name="scheduleOptimize"
                value="1"
                checked={form.scheduleOptimize === "1"}
              />
              <span>Lịch tối ưu điện năng</span>
            </div>
          </div>
        </div>
        {form.scheduleOptimize === "1" ? (
          <div className="form-group mb-2">
            <label>Ước lượng thời gian hoạt động</label>
            <div className="d-flex">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control input-time-schedule"
                  name="estimatedTime"
                  onChange={hanleChange}
                  value={form.estimatedTime}
                  placeholder="Nhập số phút"
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="form-group mb-2">
          <label>
            {form.scheduleOptimize === "0"
              ? "Thời gian bắt đầu / kết thúc"
              : "Thời gian sớm nhất / muộn  nhất"}
          </label>
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

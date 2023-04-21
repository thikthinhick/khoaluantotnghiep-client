import React, { useEffect, useState } from "react";
import "./Setting.css";
import axios from "axios";
import { URL } from "../../contants/Contants";
function TariffDetail({ close }) {
  const [form, setForm] = useState({
    Single: "",
    Peak: "",
    Idle: "",
    Normal: "",
    Number1: "",
    Number2: "",
    Number3: "",
    Number4: "",
    Number5: "",
    Number6: "",
  });
  useEffect(() => {
    axios
      .get(`${URL}api/staff`)
      .then((res) => {
        setForm(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleChangeField = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: { ...form[name], price: value } });
  };
  const submit = () => {
    if (
      window.confirm("Bạn có chắc chắn muốn cập nhật biểu giá điện hay không?")
    )
      axios
        .put(`${URL}api/staff`, form)
        .then((res) => {
          alert("Cập nhật thành công!");
        })
        .catch((err) => {
          alert("Cập nhật thất bại!");
        });
  };
  return (
    <div>
      <div className="modal-body" style={{ color: "black" }}>
        <div className="form-group mb-2">
          <label>Biểu giá điện đơn</label>
          <div style={{ marginLeft: "20px" }} className="d-flex input-setting">
            <p>+ Giá tiền</p>
            <div>
              <input
                type="number"
                className="input-custom"
                value={form.Single.price}
                name="Single"
                onChange={handleChangeField}
              />{" "}
              VNĐ / kWh
            </div>
          </div>
        </div>
        <div className="form-group mb-2">
          <label>Biểu giá điện theo thời điểm</label>
          <div style={{ marginLeft: "20px" }}>
            <div className="d-flex input-setting">
              <p>+ Thấp điểm</p>
              <div>
                <input
                  type="number"
                  className="input-custom"
                  name="Idle"
                  value={form.Idle.price}
                  onChange={handleChangeField}
                />{" "}
                VNĐ / kWh
              </div>
            </div>
            <div className="d-flex input-setting">
              <p>+ Bình thường</p>
              <div>
                <input
                  type="number"
                  className="input-custom"
                  name="Normal"
                  value={form.Normal.price}
                  onChange={handleChangeField}
                />{" "}
                VNĐ / kWh
              </div>
            </div>
            <div className="d-flex input-setting">
              <p>+ Cao điểm</p>
              <div>
                <input
                  type="number"
                  className="input-custom"
                  name="Peak"
                  value={form.Peak.price}
                  onChange={handleChangeField}
                />{" "}
                VNĐ / kWh
              </div>
            </div>
          </div>
        </div>
        <div className="form-group mb-2">
          <label>Biểu giá điện theo thời điểm</label>
          <div style={{ marginLeft: "20px" }}>
            <div className="d-flex input-setting">
              <p>+ Bậc 1 (0-50)</p>
              <div>
                <input
                  type="number"
                  className="input-custom"
                  name="Number1"
                  value={form.Number1.price}
                  onChange={handleChangeField}
                />{" "}
                VNĐ / kWh
              </div>
            </div>
            <div className="d-flex input-setting">
              <p>+ Bậc 2 (50-100)</p>
              <div>
                <input
                  type="number"
                  className="input-custom"
                  name="Number2"
                  value={form.Number2.price}
                  onChange={handleChangeField}
                />{" "}
                VNĐ / kWh
              </div>
            </div>
            <div className="d-flex input-setting">
              <p>+ Bậc 3 (100-200)</p>
              <div>
                <input
                  type="number"
                  className="input-custom"
                  name="Number3"
                  value={form.Number3.price}
                  onChange={handleChangeField}
                />{" "}
                VNĐ / kWh
              </div>
            </div>
            <div className="d-flex input-setting">
              <p>+ Bậc 4 (200-300)</p>
              <div>
                <input
                  type="number"
                  className="input-custom"
                  name="Number4"
                  value={form.Number4.price}
                  onChange={handleChangeField}
                />{" "}
                VNĐ / kWh
              </div>
            </div>
            <div className="d-flex input-setting">
              <p>+ Bậc 5 (300-400)</p>
              <div>
                <input
                  type="number"
                  className="input-custom"
                  name="Number5"
                  value={form.Number5.price}
                  onChange={handleChangeField}
                />{" "}
                VNĐ / kWh
              </div>
            </div>
            <div className="d-flex input-setting">
              <p>+ Bậc 6 (Lớn hơn 400)</p>
              <div>
                <input
                  type="number"
                  className="input-custom"
                  name="Number6"
                  value={form.Number6.price}
                  onChange={handleChangeField}
                />{" "}
                VNĐ / kWh
              </div>
            </div>
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
            onClick={submit}
          />
        </div>
      </div>
    </div>
  );
}

export default TariffDetail;

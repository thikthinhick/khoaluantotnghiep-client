import React, { useState, useEffect } from "react";
import { URL as url } from "../../contants/Contants";
import axios from "axios";
function EditAppliance({ close, roomId, updateAppliance }) {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [form, setForm] = useState({
    applianceName: "",
    applianceDescription: "",
    applianceType: "true",
  });
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const createAppliance = () => {
    var formData = new FormData();
    const x = { ...form, roomId: roomId };
    formData.append("file", selectedFile);
    formData.append("data", JSON.stringify(x));
    if (window.confirm("bạn có chắc muốn tạo thiết bị không?") === true) {
      axios
        .post(`${url}api/appliance`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          updateAppliance(res.data.info);
          close(false);
          alert("Tạo thành công!");
        })
        .catch((err) => {
          console.log(err);
          alert("Tạo thất bại!");
        });
    }
  };
  return (
    <>
      <div className="modal-body container__editroom">
        <div className="form-group mb-2">
          <label>*Tên thiết bị</label>
          <input
            type="text"
            className="form-control"
            name="applianceName"
            value={form.applianceName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-2">
          <label>Mô tả</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={form.applianceDescription}
            name="applianceDescription"
          />
        </div>
        {/* <div className="form-group mb-2">
          <label>*Loại thiết bị</label>
          <div className="d-flex">
            <div className="d-flex">
              <input
                type="radio"
                name="applianceType"
                value={true}
                checked={form.applianceType === "true"}
                onChange={handleChange}
              />
              <label
                className="check-label mx-2"
                style={{ fontWeight: "400" }}
                for="flexRadioDefault1"
              >
                Có thể lập lịch
              </label>
            </div>
            <div className="mx-4 d-flex">
              <input
                type="radio"
                value={false}
                name="applianceType"
                checked={form.applianceType === "false"}
                onChange={handleChange}
              />
              <label
                className="check-label mx-2"
                style={{ fontWeight: "400" }}
                for="flexRadioDefault2"
              >
                Không thể lập lịch
              </label>
            </div>
          </div>
        </div> */}
        <div className="form-group mb-2">
          <label>Chọn ảnh thiết bị</label>
          <input type="file" onChange={onSelectFile} className="form-control" />
          {selectedFile && (
            <img
              src={preview}
              style={{
                width: "100%",
                height: "100%",
                marginTop: "8px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "3px",
              }}
            />
          )}
        </div>
      </div>
      <div className="modal-content__footer">
        <div className="body">
          <input
            type="button"
            className="btn btn-default"
            data-dismiss="modal"
            onClick={() => close(false)}
            value="Hủy"
          />
          <input
            type="submit"
            onClick={createAppliance}
            className="btn btn-success"
            value="Ghi nhận"
          />
        </div>
      </div>
    </>
  );
}

export default EditAppliance;

import React, { useState, useEffect } from "react";
import { URL as url } from "../../contants/Contants";
import { httpClient } from "../../utils/httpClient";
function EditAppliance({ close, getDataParent, updateAppliance }) {
  const [selectedFile, setSelectedFile] = useState();
  const [form, setForm] = useState({
    applianceName: "",
    applianceDescription: "",
    thumbnail: null,
  });
  useEffect(() => {
    if (!selectedFile) {
      setForm({ ...form, thumbnail: null });
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setForm({ ...form, thumbnail: objectUrl });
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  useEffect(() => {
    setForm(() => getDataParent());
  }, []);
  const handleChange = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  const submit = () => {
    var formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("data", JSON.stringify(form));
    if (window.confirm("bạn có chắc muốn cập nhật thiết bị không?") === true) {
      httpClient()
        .put(`/api/appliance`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          alert("Update thiết bị thành công!");
          updateAppliance(form.applianceId, form.applianceName);
          close();
        })
        .catch((err) => {
          console.log(err);
          alert("Update thiết bị thất bại!");
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
        <div className="form-group mb-2">
          <label>Chọn ảnh thiết bị</label>
          <input type="file" onChange={onSelectFile} className="form-control" />
          {form.thumbnail && (
            <img
              src={form.thumbnail}
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
            className="btn btn-success"
            value="Ghi nhận"
            onClick={submit}
          />
        </div>
      </div>
    </>
  );
}

export default EditAppliance;

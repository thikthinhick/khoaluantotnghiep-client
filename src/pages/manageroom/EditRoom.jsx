import React, { useEffect, useState } from "react";
import axios from "axios";
function EditRoom({ addRoom }) {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [form, setForm] = useState({ roomName: "", descriptionRoom: "" });
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const onUpdateField = (e) => {
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
  const createRoom = () => {
    var formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("data", JSON.stringify(form));
    if (window.confirm("bạn có chắc muốn tạo phòng không?") === true) {
      axios
        .post("http://localhost:8081/api/room", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          alert("Tạo phòng thành công!");
          addRoom(res.data.info);
        })
        .catch((err) => {
          console.log(err);
          alert("Tạo phòng thất bại!");
        });
    }
  };
  return (
    <>
      <div className="modal-body container__editroom">
        <div class="form-group mb-2">
          <label>Tên Phòng</label>
          <input
            type="text"
            class="form-control"
            value={form.roomName}
            name="roomName"
            onChange={onUpdateField}
          />
        </div>
        <div class="form-group mb-2">
          <label>Mô tả</label>
          <input
            type="text"
            class="form-control"
            value={form.descriptionRoom}
            name="descriptionRoom"
            onChange={onUpdateField}
          />
        </div>
        <div className="form-group mb-2">
          <label>Chọn ảnh phòng</label>
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
            class="btn btn-default"
            data-dismiss="modal"
            value="Hủy"
          />
          <input
            type="submit"
            class="btn btn-success"
            value="Ghi nhận"
            onClick={createRoom}
          />
        </div>
      </div>
    </>
  );
}

export default EditRoom;

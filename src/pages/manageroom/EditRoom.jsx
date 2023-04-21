import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { URL as url } from "../../contants/Contants";
function EditRoom({ getDataParent, updateRoom, close }) {
  const [selectedFile, setSelectedFile] = useState();

  const [form, setForm] = useState({
    roomName: "",
    descriptionRoom: "",
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
    const { roomName, descriptionRoom, thumbnail, roomId } = getDataParent();
    setForm({
      roomName: roomName,
      descriptionRoom: descriptionRoom,
      thumbnail: thumbnail,
      roomId: roomId,
    });
  }, []);
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
  const submit = () => {
    var formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("data", JSON.stringify(form));
    if (window.confirm("bạn có chắc muốn cập nhật phòng không?") === true) {
      axios
        .put(`${url}api/room?id=${form.roomId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          alert("Update phòng thành công!");
          updateRoom(res.data.info);
          close();
        })
        .catch((err) => {
          console.log(err);
          alert("Update phòng thất bại!");
        });
    }
  };
  return (
    <>
      <div className="modal-body container__editroom">
        <div className="form-group mb-2">
          <label>Tên Phòng</label>
          <input
            type="text"
            className="form-control"
            value={form.roomName}
            name="roomName"
            onChange={onUpdateField}
          />
        </div>
        <div className="form-group mb-2">
          <label>Mô tả</label>
          <input
            type="text"
            className="form-control"
            value={form.descriptionRoom}
            name="descriptionRoom"
            onChange={onUpdateField}
          />
        </div>
        <div className="form-group mb-2">
          <label>Chọn ảnh phòng</label>
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
            value="Hủy"
            onClick={close}
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

export default memo(EditRoom);

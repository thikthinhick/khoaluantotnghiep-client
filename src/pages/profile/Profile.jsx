import React, { useState, useEffect } from "react";
import { useStore } from "../../store/AppProvider";
import UpdatePassword from "./UpdatePassword";
import Popup from "../../components/popup/Popup";
import { CameraFill } from "react-bootstrap-icons";
import "./Profile.css";
import axios from "axios";
import { URL as url } from "../../contants/Contants";
import { useNavigate } from "react-router-dom";
export const Profile = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [state, setState] = useState({});
  const [visiabled, setVisiabled] = useState(false);
  const { user, setUser, setLoading, signout } = useStore();
  const nav = useNavigate();
  useEffect(() => {
    if (!selectedFile) {
      setState({ ...state, thumbnail: null });
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setState({ ...state, thumbnail: objectUrl });
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const logout = () => {
    signout();
    nav("/login");
  };
  useEffect(() => {
    if (user) {
      setLoading(true);
      axios
        .get(`${url}api/auth/get_profile`, {
          headers: {
            Accept: "application/json",
            Authorization: localStorage.getItem("user")
              ? "Bearer " + JSON.parse(localStorage.getItem("user")).value.token
              : "",
            Profile: true,
          },
        })
        .then((res) => {
          setTimeout(() => {
            setLoading(false);
          }, 500);

          setState(res.data);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else nav("/login");
  }, []);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setTimeout(() => {
      if (window.confirm("Bạn có muốn cập nhật ảnh đại diện không ?")) {
        var formData = new FormData();
        formData.append("file", e.target.files[0]);
        axios
          .put(`${url}api/auth/update_profile`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: localStorage.getItem("user")
                ? "Bearer " +
                  JSON.parse(localStorage.getItem("user")).value.token
                : "",
              Profile: true,
            },
          })
          .then((res) => {
            const newUser = { ...user.value, thumbnail: res.data };

            setUser(newUser, 1000 * 60 * 60 * 24 * 7);
            alert("Cập nhật ảnh đại diện thành công!");
          })
          .catch((err) => {});
      }
    }, 500);
  };

  return (
    <div className="container-error  bg-dark">
      <center>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>Trang cá nhân</h1>
        <div style={{ margin: "20px 0px" }}>
          <label for="fileToUpload">
            <div
              class="profile-pic"
              style={{
                backgroundImage: `url(${state.thumbnail})`,
              }}
            >
              <CameraFill size={24} />
              <h4>Chọn ảnh</h4>
            </div>
          </label>
          <input
            type="File"
            name="fileToUpload"
            onChange={onSelectFile}
            id="fileToUpload"
          />
        </div>

        <h4 style={{ margin: "10px 0px", color: "white" }}>
          Email: {state?.email}
        </h4>
        <h4 style={{ margin: "10px 0px", color: "white" }}>
          Tên đăng nhập: {state?.username}
        </h4>

        <h3 style={{ marginTop: "20px" }}>
          <Popup
            title={"Thay đổi mật khẩu"}
            show={visiabled}
            close={() => setVisiabled(false)}
            trigger={
              <a
                style={{
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => setVisiabled(true)}
              >
                Thay đổi mật khẩu
              </a>
            }
          >
            <UpdatePassword close={() => setVisiabled(false)} />
          </Popup>

          <a
            style={{ color: "white", cursor: "pointer", margin: "0px 10px" }}
            onClick={logout}
          >
            Đăng xuất
          </a>
          {state.active ? (
            <a
              style={{ color: "white", cursor: "pointer" }}
              onClick={() => nav("/")}
            >
              Trở về trang chủ
            </a>
          ) : (
            <></>
          )}
        </h3>
        <br></br>
        <br></br>
      </center>
    </div>
  );
};

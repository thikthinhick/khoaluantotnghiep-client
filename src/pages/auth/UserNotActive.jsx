import React from "react";
import { useStore } from "../../store/AppProvider";

function UserNotActive() {
  const { user } = useStore();
  return (
    <div className="container-error">
      <center>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>Trang cá nhân</h1>

        <img
          src={user?.value.thumbnail}
          style={{
            height: "300px",
            width: "300px",
            objectFit: "cover",
            borderRadius: "150px",
          }}
        />
        <h3 style={{ margin: "10px 0px" }}>
          <b>Email: </b>nhoctrum03022001@gmail.com
        </h3>
        <h3 style={{ margin: "10px 0px" }}>
          <b>Username: </b>
          {user?.value.username}
        </h3>
        <h3>
          <a style={{ marginRight: "10px" }} href="/">
            Thay đổi mật khẩu
          </a>
          <a href="/">Đăng xuất</a>
        </h3>
        <br></br>
        <br></br>
      </center>
    </div>
  );
}

export default UserNotActive;

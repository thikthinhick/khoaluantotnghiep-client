import React from "react";
import { Table, House } from "react-bootstrap-icons";
import "./ManageRoom.css";
import Room from "./Room";
function ManageRoom() {
  return (
    <main>
      <div className="container-fluid px-4">
        <div class="container">
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4">
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ManageRoom;

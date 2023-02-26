import React, { useEffect, useState } from "react";
import { BarChart } from "react-bootstrap-icons";
import Speedometter from "./Speedometter";
import Chartmetter from "./Chartmetter";
import Weather from "../../components/Weather";
import { GraphUp, Speedometer2, ListUl } from "react-bootstrap-icons";
import "./Home.css";
import { ButtonPower } from "../../components/button/Button";
const URL_WEB_SOCKET = "ws://localhost:8081/websocket";
const request = {
  typeMessage: "SUBSCRIBE",
};
function Home() {
  const [ws, setWs] = useState(null);
  const [speed, setSpeed] = useState(0);
  // useEffect(() => {
  //   const wsClient = new WebSocket(URL_WEB_SOCKET);
  //   wsClient.onopen = () => {
  //     setWs(wsClient);
  //     wsClient.send(JSON.stringify(request));
  //     console.log("connected to server!");
  //   };
  //   wsClient.onmessage = (response) => {
  //     let message = JSON.parse(response.data);
  //     let sum = 0;
  //     message.data.applianceList.forEach((element) => {
  //       sum += element.currentConsumption;
  //     });
  //     setSpeed(sum);
  //   };
  //   wsClient.onclose = () => console.log("closed!");
  //   return () => {
  //     wsClient.close();
  //   };
  // }, []);
  return (
    <main>
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-3 col-md-6">
            <div class="card bg-primary text-white mb-4">
              <div class="card-body">Tổng tiêu thụ trong ngày</div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                <div class="small text-white">100.23 kWh</div>
                <div class="small text-white">
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6">
            <div class="card bg-danger text-white mb-4">
              <div class="card-body">Tổng tiêu thụ trong tháng</div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                <div class="small text-white">100.23 kWh</div>
                <div class="small text-white">
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6">
            <div class="card bg-success text-white mb-4">
              <div class="card-body">Số thiết bị đang hoạt động</div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                <div class="small text-white">10 / 25 thiết bị</div>
                <div class="small text-white">
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6">
            <div class="card-body">
              <Weather />
            </div>
          </div>
        </div>
      </div>
      <div class="row mx-1">
        <div className="col-xl-3 d-flex flex-column">
          <div class="card">
            <div className="card-header align-items-center d-flex">
              <Speedometer2 />
              &nbsp; Công tơ điện
            </div>
            <div className="card-body">
              <Speedometter value={speed} />
            </div>
          </div>
          <br></br>
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header align-items-center d-flex">
              <ListUl color="transparent" />
            </div>
            <div className="card-body">
              <table className="table-home">
                <tr>
                  <td colspan="2">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <ButtonPower />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>Chi phí tháng này:</b>
                  </td>
                  <td>
                    50.000 <b>VNĐ</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Chi phí tháng trước:</b>{" "}
                  </td>
                  <td>
                    100.000 <b>VNĐ</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Tổng tất cả chi phí:</b>
                  </td>
                  <td>
                    1.000.000 <b>VNĐ</b>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="col-xl-9">
          <div class="card mb-4" style={{ height: "100%" }}>
            <div className="card-header align-items-center d-flex live-chart">
              <GraphUp />
              &nbsp; Biểu đồ theo dõi tiêu thụ trực tiếp
            </div>
            <div class="card-body">
              <Chartmetter speed={speed} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;

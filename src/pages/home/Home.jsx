import React, { useEffect, useState } from "react";
import { BarChart } from "react-bootstrap-icons";
import Speedometter from "./Speedometter";
import Chartmetter from "./Chartmetter";
import { GraphUp, Speedometer2 } from "react-bootstrap-icons";
import "./Home.css";
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
            <div class="card bg-warning text-white mb-4">
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
              <div class="card-body">Tổng tiêu thụ trong năm</div>
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
              <div class="card-body">Tổng tiêu thụ</div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                <div class="small text-white">100.23 kWh</div>
                <div class="small text-white">
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mx-1">
        <div className="col-xl-3">
          <div class="card">
            <div className="card-header align-items-center d-flex">
              <Speedometer2 />
              &nbsp; Công tơ điện
            </div>
            <div class="card-body">
              <Speedometter value={speed} />
              <div>
                <table className="table detail-speedmetter">
                  <tbody>
                    <tr>
                      <td>Công suất cao nhất:</td>
                      <td>4000 W</td>
                    </tr>
                    <tr>
                      <td>Công suất thấp nhất:</td>
                      <td>10 W</td>
                    </tr>
                    <tr>
                      <td>Tiêu thụ lãng phí:</td>
                      <td>100 kWh</td>
                    </tr>
                    <tr>
                      <td>Tổng số thiết bị:</td>
                      <td>10 / 22</td>
                    </tr>
                    <tr>
                      <td>Số tiền phải trả:</td>
                      <td>120.4433 VNĐ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-9">
          <div class="card mb-4">
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

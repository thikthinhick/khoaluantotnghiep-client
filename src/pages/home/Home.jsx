import React, { useEffect, useState } from "react";
import { BarChart, SortUpAlt } from "react-bootstrap-icons";
import Speedometter from "./Speedometter";
import Chartmetter from "./Chartmetter";
import Weather from "../../components/Weather";
import { Speedometer2, ListUl } from "react-bootstrap-icons";
import "./Home.css";
import axios from "axios";
import { ButtonPower } from "../../components/button/Button";
import { URL } from "../../contants/Contants";
const URL_WEB_SOCKET = "ws://localhost:8081/websocket";
const request = {
  typeMessage: "SUBSCRIBE",
};
function Home() {
  const [ws, setWs] = useState(null);
  const [speed, setSpeed] = useState({});
  const [dataChart, setDataChart] = useState([]);
  const [state, setState] = useState({
    consumptionInDay: "",
    consumptionInMonth: "",
    consumptionInYear: "",
    consumptionTotal: "",
    costLastMonth: "",
    costCurrentMonth: "",
    costTotal: "",
  });
  useEffect(() => {
    axios
      .get(`${URL}api/consumption/last_consumption`)
      .then((response) => {
        let data = [];
        response.data.forEach((element) => {
          data.push({
            x: Date.parse(element.time),
            y: element.currentConsumption,
          });
        });
        setDataChart(data);
      })
      .catch((err) => {
        console.error(err);
      });
    axios
      .get(`${URL}api/home`)
      .then((response) => {
        console.log(response.data);
        setState(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    const wsClient = new WebSocket(URL_WEB_SOCKET);
    wsClient.onopen = () => {
      setWs(wsClient);
      wsClient.send(JSON.stringify(request));
      console.log("connected to server!");
    };
    wsClient.onmessage = (response) => {
      let message = JSON.parse(response.data);
      if (message.typeMessage === "CHART_HOME") {
        setDataChart([
          ...dataChart,
          {
            x: Date.parse(message.data.time),
            y: message.data.currentConsumption,
          },
        ]);
      } else if (message.typeMessage === "SPEED_METTER") {
        console.log(message.data);
        setSpeed(message.data);
      }
    };
    wsClient.onclose = () => console.log("closed!");
    return () => {
      wsClient.close();
    };
  }, []);
  return (
    <main>
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-3 col-md-6">
            <div class="card bg-primary text-white mb-4">
              <div class="card-body">Tổng tiêu thụ trong ngày</div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                <div class="small text-white">{state.consumptionInDay} kWh</div>
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
                <div class="small text-white">
                  {state.consumptionInMonth} kWh
                </div>
                <div class="small text-white">
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6">
            <div class="card bg-success text-white mb-4">
              <div class="card-body">Tổng tiêu thụ</div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                <div class="small text-white">{state.consumptionTotal} kWh</div>
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
              <Speedometter value={speed.currentConsumption} />
            </div>
          </div>
          <br></br>
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header align-items-center d-flex">
              <ListUl />
              &nbsp; Tổng quát
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
                    {state.costCurrentMonth} <b>VNĐ</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Chi phí tháng trước:</b>{" "}
                  </td>
                  <td>
                    {state.costLastMonth} <b>VNĐ</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Tổng tất cả chi phí:</b>
                  </td>
                  <td>
                    {state.costTotal} <b>VNĐ</b>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="col-xl-9">
          <Chartmetter dataChart={dataChart} />
        </div>
      </div>
    </main>
  );
}

export default Home;

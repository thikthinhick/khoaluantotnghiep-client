import axios from "axios";
import React, { useEffect, useState } from "react";
import { BarChart, CashCoin, Speedometer2 } from "react-bootstrap-icons";
import { ButtonPower } from "../../components/button/Button";
import Weather from "../../components/Weather";
import { URL } from "../../contants/Contants";
import Chartmetter from "./Chartmetter";
import "./Home.css";
import Speedometter from "./Speedometter";
const URL_WEB_SOCKET = "ws://localhost:8081/websocket";
const request = {
  typeMessage: "SUBSCRIBE_HOME",
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary-custom text-white mb-4">
              <div className="card-body">Tổng tiêu thụ trong ngày</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <div className="small text-white">
                  {state.consumptionInDay} Số điện
                </div>
                <div className="small text-white">
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary-custom text-white mb-4">
              <div className="card-body">Tổng tiêu thụ trong tháng</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <div className="small text-white">
                  {state.consumptionInMonth} Số điện
                </div>
                <div className="small text-white">
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary-custom text-white mb-4">
              <div className="card-body">Tổng tiêu thụ</div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <div className="small text-white">
                  {state.consumptionTotal} Số điện
                </div>
                <div className="small text-white">
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card-body">
              <Weather />
            </div>
          </div>
        </div>
      </div>
      <div className="row mx-1">
        <div className="col-xl-3 d-flex flex-column">
          <div className="d-flex mb-4">
            <ButtonPower />
          </div>

          <div className="card">
            <div className="card-header align-items-center d-flex">
              <Speedometer2 />
              &nbsp; Công tơ điện
            </div>
            <div className="card-body">
              <Speedometter value={speed.currentConsumption} />
            </div>
          </div>
          <br></br>
          <div className="card">
            <div className="card-header align-items-center d-flex">
              <CashCoin />
              &nbsp; Chi phí
            </div>
            <div className="card-body">
              <table className="table-home">
                <tr>
                  <td>Chi phí tháng này:</td>
                  <td>
                    <b>{state.costCurrentMonth}</b>
                  </td>
                </tr>
                <tr>
                  <td>Chi phí tháng trước:</td>
                  <td>
                    <b>{state.costLastMonth}</b>
                  </td>
                </tr>
                <tr>
                  <td>Tổng tất cả chi phí:</td>
                  <td>
                    <b>{state.costTotal}</b>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="col-xl-9">
          <Chartmetter dataChart={dataChart} />
        </div>
      </div>
    </main>
  );
}

export default Home;

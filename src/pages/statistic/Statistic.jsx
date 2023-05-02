import React, { useEffect, useState } from "react";
import { BarChart, Cash, SortUpAlt } from "react-bootstrap-icons";
import StatisticBarChart1 from "./StatisticBarChart1";
import StatisticBarChart2 from "./StatisticBarChart2";
import moment from "moment";
import PieChart from "./PieChart";
import HorizontalChart from "./HorizontalChart";
import "./Statistic.css";
import { URL } from "../../contants/Contants";
import axios from "axios";
const staffs = ["Theo thời điểm", "Đơn", "Theo lượng tiêu thụ"];
function Statistic() {
  const [state, setState] = useState({});
  const [form, setForm] = useState({
    chart1: moment().format("YYYY-MM-DD"),
    chart2: {
      type: 1,
      day: moment().format("YYYY-MM-DD"),
    },
    chart3: {
      type: 1,
      day: moment().format("YYYY-MM-DD"),
    },
    chart4: {
      type: 1,
      day: moment().format("YYYY-MM-DD"),
    },
  });
  useEffect(() => {
    axios
      .get(`${URL}api/statistic`)
      .then((res) => {
        setState({ ...state, ...res.data });
      })
      .catch((err) => console.log(err));
  }, []);
  const onChangeSelect = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "chart2": {
        axios
          .get(
            `${URL}api/statistic/per_hour?day=${form.chart2.day}&type=${value}`
          )
          .then((res) => {
            setState({ ...state, consumptionPerHour: res.data });
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }
      case "chart3": {
        axios
          .get(
            `${URL}api/statistic/by_rooms?day=${form.chart3.day}&type=${value}`
          )
          .then((res) => {
            setState({ ...state, consumptionByRooms: res.data });
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }
      case "chart4": {
        axios
          .get(
            `${URL}api/statistic/by_appliances?day=${form.chart4.day}&type=${value}`
          )
          .then((res) => {
            setState({ ...state, consumptionByAppliances: res.data });
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      }
      default:
        break;
    }
    setForm({ ...form, [name]: { day: form[name].day, type: value } });
  };
  const onChangeField = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "chart1": {
        axios
          .get(`${URL}api/statistic/recent_days?day=${value}`)
          .then((res) => {
            setState({ ...state, consumptionMostRecentDays: res.data });
          })
          .catch((err) => {
            console.log(err);
          });
        setForm({ ...form, [name]: value });
        break;
      }
      case "chart2": {
        axios
          .get(
            `${URL}api/statistic/per_hour?day=${value}&type=${form.chart2.type}`
          )
          .then((res) => {
            setState({ ...state, consumptionPerHour: res.data });
          })
          .catch((err) => {
            console.log(err);
          });
        setForm({ ...form, [name]: { type: form.chart2.type, day: value } });
        break;
      }
      case "chart3": {
        axios
          .get(
            `${URL}api/statistic/by_rooms?day=${value}&type=${form.chart3.type}`
          )
          .then((res) => {
            setState({ ...state, consumptionByRooms: res.data });
          })
          .catch((err) => {
            console.log(err);
          });
        setForm({ ...form, [name]: { type: form.chart3.type, day: value } });
        break;
      }
      case "chart4": {
        axios
          .get(
            `${URL}api/statistic/by_appliances?day=${value}&type=${form.chart4.type}`
          )
          .then((res) => {
            setState({ ...state, consumptionByAppliances: res.data });
          })
          .catch((err) => {
            console.log(err);
          });
        setForm({ ...form, [name]: { type: form.chart4.type, day: value } });
        break;
      }
      default:
        break;
    }
  };
  return (
    <main>
      <div className="container-fluid px-4">
        <div>
          <div className="card mb-4">
            <div
              className="card-header"
              style={{
                display: "flex",
                fontSize: "14px",
                alignItems: "center",
              }}
            >
              <Cash />
              &nbsp; Danh sách hóa đơn
            </div>
            <div className="card-body">
              <table id="customers">
                <tr>
                  <th>STT</th>
                  <th>Tháng</th>
                  <th>Năm</th>
                  <th>Loại hóa đơn</th>
                  <th>Số điện</th>
                  <th>Số tiền phải trả</th>
                </tr>
                {state.billStaffs?.map((element, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.month}</td>
                    <td>{element.year}</td>
                    <td>{staffs[element.staffType - 1]}</td>
                    <td>{element.consumption}</td>
                    <td>{element.cost}</td>
                  </tr>
                ))}
              </table>
              <div className="mt-3" style={{ float: "right" }}>
                {/* <Pagination /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 row">
          <div className="col-6">
            <div className="card mb-4">
              <div
                className="card-header"
                style={{
                  display: "flex",
                  fontSize: "14px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <BarChart />
                  &nbsp;Biểu đồ tiêu thụ các ngày gần nhất
                </div>
                <div className="choose-time">
                  <input
                    type="date"
                    name="chart1"
                    value={form.chart1}
                    onChange={onChangeField}
                  />
                </div>
              </div>
              <div className="card-body">
                <StatisticBarChart1 data={state.consumptionMostRecentDays} />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card mb-4">
              <div
                className="card-header"
                style={{
                  display: "flex",
                  fontSize: "14px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <BarChart />
                  &nbsp; Biểu đồ tiêu thụ TB theo từng giờ
                </div>

                <div className="choose-time">
                  <select
                    name="chart2"
                    onChange={onChangeSelect}
                    value={form.chart2.type}
                  >
                    <option value="1">Theo ngày</option>
                    <option value="2">Theo tháng</option>
                    <option value="3">Theo năm</option>
                    <option value="4">Tất cả</option>
                  </select>
                  <input
                    type="date"
                    name="chart2"
                    onChange={onChangeField}
                    value={form.chart2.day}
                  />
                </div>
              </div>
              <div className="card-body">
                <StatisticBarChart2 data={state.consumptionPerHour} />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card mb-4">
              <div
                className="card-header"
                style={{
                  display: "flex",
                  fontSize: "14px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <BarChart />
                  &nbsp; Biểu đồ lượng tiêu thụ các phòng
                </div>

                <div className="choose-time">
                  <select
                    name="chart3"
                    onChange={onChangeSelect}
                    value={form.chart3.type}
                  >
                    <option value="1">Theo ngày</option>
                    <option value="2">Theo tháng</option>
                    <option value="3">Theo năm</option>
                    <option value="4">Tất cả</option>
                  </select>
                  <input
                    type="date"
                    name="chart3"
                    onChange={onChangeField}
                    value={form.chart3.day}
                  />
                </div>
              </div>
              <div className="card-body">
                <PieChart data={state?.consumptionByRooms} />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card mb-4">
              <div
                className="card-header"
                style={{
                  display: "flex",
                  fontSize: "14px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <BarChart />
                  &nbsp; Biểu đồ lượng tiêu thụ các thiết bị
                </div>

                <div className="choose-time">
                  <select
                    name="chart4"
                    value={form.chart4.type}
                    onChange={onChangeSelect}
                  >
                    <option value="1">Theo ngày</option>
                    <option value="2">Theo tháng</option>
                    <option value="3">Theo năm</option>
                    <option value="4">Tất cả</option>
                  </select>
                  <input
                    type="date"
                    name="chart4"
                    value={form.chart4.day}
                    onChange={onChangeField}
                  />
                </div>
              </div>
              <div className="card-body">
                <HorizontalChart data={state.consumptionByAppliances} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Statistic;

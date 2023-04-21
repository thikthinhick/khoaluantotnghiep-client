import "chartjs-plugin-streaming";
import React, { memo, useState } from "react";
import { GraphUp } from "react-bootstrap-icons";
import { Line } from "react-chartjs-2";
const typeTimes = [
  {
    duration: 1000 * 60 * 15,
    delay: 10000,
    refresh: 15000,
  },
  {
    duration: 1000 * 60 * 60 * 24,
    delay: 15000 * 12 * 8,
    refresh: 15000 * 60,
  },
];
function Chartmetter({ dataChart, changeChartType }) {
  const [typeTime, setTypeTime] = useState(typeTimes[0]);
  const changeTypeTime = (e) => {
    changeChartType(e.target.value);
    setTypeTime(typeTimes[e.target.value]);
  };
  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, "rgba(250,174,50,1)");
    gradient.addColorStop(1, "rgba(250,174,50,0)");

    return {
      datasets: [
        {
          label: "Công suất tiêu thụ",
          borderColor: "#FF6384",
          backgroundColor: gradient,
          fill: true,
          pointStyle: "none",
          pointRadius: 0,
          borderWidth: 1.5,
          data: dataChart,
        },
      ],
    };
  };
  const options = {
    elements: {
      line: {
        tension: 0.2,
        borderWidth: 1.5,
        color: "#9BD0F5",
        lineTension: 0,
      },
    },
    animation: {
      duration: 0,
    },
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            duration: typeTime.duration,
            frameRate: 30,
            delay: typeTime.delay,
            refresh: typeTime.refresh,
            pause: false,
            time: {
              displayFormat: "h",
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            max: 2000,
            min: 0,
          },
        },
      ],
    },
  };

  return (
    <div className="card mb-4" style={{ height: "100%" }}>
      <div className="card-header align-items-center d-flex live-chart justify-content-between">
        <div>
          <GraphUp />
          &nbsp; Biểu đồ theo dõi tiêu thụ trực tiếp
        </div>
        <select name="time" id="time" onChange={changeTypeTime}>
          <option value="0">Theo dõi trong 15 phút</option>
          <option value="1">Theo dõi trong 1 ngày</option>
        </select>
      </div>
      <div style={{ height: "100%" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default memo(Chartmetter);
